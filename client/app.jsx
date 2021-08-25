import React, { useState, useEffect } from 'react';
import DataForm from './DataForm.jsx';
import Table from './Table.jsx';
import moment from 'moment';
import _ from 'lodash';
import { useCookies } from 'react-cookie';

const App = () => {
  const [cookies, setCookie] = useCookies(['lawrenceNorthSux'])

  let [spreadsheetUrl, setSpreadsheetUrl] = useState(cookies.spreadsheetUrl || '');
  let [modifiedUrl, setModifiedUrl] = useState(cookies.modifiedUrl || '');
  let [json, setJson] = useState(undefined);
  let [refactoredJson, setRefactoredJson] = useState(undefined)
  let [teacherOptions, updateTeacherOptions] = useState(['All']);
  let [classOptions, updateClassOptions] = useState(['All']);
  let [teacherIdx, setTeacherIdx] = useState(0)
  let [teacherFilter, setTeacherFilter] = useState('All');
  let [classIdx, setClassIdx] = useState(0)
  let [classFilter, setClassFilter] = useState('All');
  let [columnLetters, setColumnLetters] = useState([]);
  let [gradedColumns, setGradedColumns] = useState({});
  let [startOfDateRange, setStartOfDateRange] = useState(moment(Date.now() - 2592000000).format('YYYY-MM-DD'));
  let [endOfDateRange, setEndOfDateRange] = useState(moment(Date.now()).format('YYYY-MM-DD'))
  let [maxDate, setMaxDate] = useState(moment(Date.now()).format('YYYY-MM-DD'))
  let [dateIdx, setDateIdx] = useState(0);
  let [maxPointsPerQuestion, setMaxPointsPerQuestion] = useState(cookies.maxPointsPerQuestion || 3);
  let [loading, setLoading] = useState(false);
  let [statistics, setStatistics] = useState({
    'Meets': 0,
    'Exceeds': 0,
    'Not Met': 0
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    
    fetch(modifiedUrl)
    .then(res => res.text())
    .then(text => {
      const responseJson = JSON.parse(text.substr(47).slice(0, -2));
      setJson(responseJson);
    })
    
  }

  const debouncedSetRefactoredJson = _.debounce((json) => {
    return setRefactoredJson(json);
  }, 1000);

  const debouncedSetStartOfDateRange = _.debounce((date) => {
    setStartOfDateRange(date);
  }, 1000)
  const debouncedSetEndOfDateRange = _.debounce((date) => {
    setEndOfDateRange(date);
  }, 1000)


  const transformUrl = (url) => {

    return `https://docs.google.com/spreadsheets/d/${url}/gviz/tq?tqx=out:json`;

  }

  const convertIdxToLetter = (idx) => {
    const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let columnLetter;

    if (idx / 26 < 1) {
      columnLetter = alpha[idx];
    } else if (idx / 26 >= 1 && idx / 26 < 26) {
      columnLetter = alpha[Math.floor(idx / 26) - 1] + alpha[idx % 26];
    }
    return columnLetter;
  }

  const convertLetterToIdx = (letter) => {
    const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    if (letter.length === 1) {
      return alpha.indexOf(letter);
    } else {

      let idx = (alpha.indexOf(letter[0]) + 1) * 26;
      idx += alpha.indexOf(letter[0]) + 1;
      return idx;

    }
  }

  const handleGradedColumns = (columns) => {

    setGradedColumns(columns);

  }

  const refactorJson = (json) => {
    let newJson = JSON.parse(JSON.stringify(json));
    let length = 0;
    let newStats = {
      'Met': 0,
      'In Progress': 0,
      'Not Met': 0
    };

    for (let key in gradedColumns) {
      if (gradedColumns[key]) {
        length++;
      }
    }

    newJson.table.cols.push({label: 'Total', id: convertIdxToLetter(newJson.table.cols.length)})
    newJson.table.cols.push({label: 'Average', id: convertIdxToLetter(newJson.table.cols.length + 1)})
    newJson.table.cols.push({label: 'M, IP, NM', id: convertIdxToLetter(newJson.table.cols.length + 2)})

    for (let i = 0; i < newJson.table.rows.length; i++) {
      let total = 0;

      for (let j = 0; j < newJson.table.rows[i].c.length; j++) {

        if (newJson.table.rows[i].c[i] === null) {
          newJson.table.rows[i].c[j] = {v: null}
        }

        if (newJson.table.rows[i].c[j]) {
          if (newJson.table.rows[i].c[j].v) {
            if (newJson.table.rows[i].c[j].v.toString().slice(0, 4) === 'Date') {
              newJson.table.rows[i].c[j].v = newJson.table.rows[i].c[j].f
            }
          }
        }

      }

      for (let key in gradedColumns) {
        let num = newJson.table.rows[i].c[key];
        if (num && gradedColumns[key]) {
          total += Number(num.v);
        }

      }


      let average = total / length;
      let standard = (average / maxPointsPerQuestion) >= 0.8 ? {v: 'Met', color: 'green'} : (average/ maxPointsPerQuestion) >= 0.5 ? {v: 'In Progress', color: 'yellow'} : {v: 'Not Met', color: 'red'};
      newStats[standard.v]++;
      average = isNaN(average) ? ' ' : average;
      newJson.table.rows[i].c.push({v: total})
      newJson.table.rows[i].c.push({v: average})
      newJson.table.rows[i].c.push(standard)
      
    }

    setRefactoredJson(newJson);
    setStatistics(newStats);
    setLoading(false);
  }

  const debouncedRefactorJson = _.debounce((json) => {
    setLoading(true)
    refactorJson(json)
  }, 1000);

  useEffect(() => {
    let elements = spreadsheetUrl.split('/');

    for (let i = 0; i < elements.length; i++) {
      if (elements[i - 1] === 'd') {
        let modified = transformUrl(elements[i]);
        setModifiedUrl(modified);
        break;
      }
    }

  }, [spreadsheetUrl]);

  useEffect(() => {
    if (json) {

      let letters = [];
      let columns = {};
      for (let i = 0; i < json.table.cols.length; i++) {
        letters.push(json.table.cols[i].id);
        columns[i] = false;
      }
      setColumnLetters(letters);
      setGradedColumns(columns);
    }
  }, [json]);

  useEffect(() => {

    if (json) {
      debouncedRefactorJson(json);
    }


  }, [gradedColumns, maxPointsPerQuestion, startOfDateRange, endOfDateRange]);

  useEffect(() => {

    if (json) {
      let tempTeacherOptions = [];
      for (let i = 0; i < json.table.rows.length; i++) {
        let row = json.table.rows[i];
  
        if (row.c[teacherIdx] && !tempTeacherOptions.includes(row.c[teacherIdx].v)) {
          tempTeacherOptions.push(row.c[teacherIdx].v);
        }
  
      }
      tempTeacherOptions.sort();
      tempTeacherOptions.unshift('All')
      updateTeacherOptions(tempTeacherOptions);
    }


  }, [teacherIdx])

  useEffect(() => {

    if (json) {
      let tempClassOptions = [];
      for (let i = 0; i < json.table.rows.length; i++) {
        let row = json.table.rows[i];
  
        if (row.c[classIdx] && !tempClassOptions.includes(row.c[classIdx].v)) {
          tempClassOptions.push(row.c[classIdx].v);
        }
  
      }
      tempClassOptions.sort();
      tempClassOptions.unshift('All')
      updateClassOptions(tempClassOptions);
    }


  }, [classIdx])

  useEffect(() => {
     setCookie('spreadsheetUrl', spreadsheetUrl, { path: '/' });
    setCookie('modifiedUrl', modifiedUrl, { path: '/' });
    setCookie('teacherOptions', teacherOptions, { path: '/' });
    setCookie('classOptions', classOptions, { path: '/' });
    setCookie('classFilter', classFilter, { path: '/' });
    setCookie('teacherIdx', teacherIdx, { path: '/' });
    setCookie('teacherFilter', teacherFilter, { path: '/' });
    setCookie('gradedColumns', gradedColumns, { path: '/' });
    setCookie('maxPointsPerQuestion', maxPointsPerQuestion, { path: '/' });
  }, [
    spreadsheetUrl,
    teacherOptions,
    classOptions,
    classFilter,
    teacherIdx,
    teacherFilter,
    gradedColumns,
    startOfDateRange,
    endOfDateRange,
    maxPointsPerQuestion
  ])



  return (
    <div>
      <span>{'LT Data Collection'}
      {loading && <span dangerouslySetInnerHTML={{__html: '<img id="loading" class="item fade-in-fast" src="https://cdnjs.cloudflare.com/ajax/libs/bxslider/4.2.5/images/bx_loader.gif" width="20" height="20">'}}></span>}
      </span>
      <DataForm
        handleSubmit={handleSubmit}
        setSpreadsheetUrl={setSpreadsheetUrl}
        setTeacherFilter={setTeacherFilter}
        setTeacherIdx={setTeacherIdx}
        setClassFilter={setClassFilter}
        setClassIdx={setClassIdx}
        convertLetterToIdx={convertLetterToIdx}
        columnLetters={columnLetters}
        teacherOptions={teacherOptions}
        classOptions={classOptions}
        gradedColumns={gradedColumns}
        setGradedColumns={handleGradedColumns}
        startOfDateRange={startOfDateRange}
        endOfDateRange={endOfDateRange}
        setStartOfDateRange={debouncedSetStartOfDateRange}
        setEndOfDateRange={debouncedSetEndOfDateRange}
        maxDate={maxDate}
        setDateIdx={setDateIdx}
        setMaxPointsPerQuestion={setMaxPointsPerQuestion}
        maxPointsPerQuestion={maxPointsPerQuestion}
        spreadsheetUrl={spreadsheetUrl}
        teacherFilter={teacherFilter}
        classFilter={classFilter}
      />
      {refactoredJson && <Table
        table={refactoredJson.table}
        convertIdxToLetter={convertIdxToLetter}
        teacherFilter={teacherFilter}
        teacherIdx={teacherIdx}
        classFilter={classFilter}
        classIdx={classIdx}
        dateIdx={dateIdx}
        startOfDateRange={startOfDateRange}
        endOfDateRange={endOfDateRange}
        statistics={statistics}
      ></Table>}
    </div>
  )
}

export default App;
