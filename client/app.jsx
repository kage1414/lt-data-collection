import React, { useState, useEffect } from 'react';
import { CookiesProvider } from 'react-cookie';
import DataForm from './DataForm.jsx';
import Table from './Table.jsx';

const App = () => {

  let [spreadsheetUrl, setSpreadsheetUrl] = useState('');
  let [modifiedUrl, setModifiedUrl] = useState('');
  let [json, setJson] = useState(undefined);
  let [refactoredJson, setRefactoredJson] = useState(undefined)
  let [teacherOptions, updateTeacherOptions] = useState(['All']);
  let [classOptions, updateClassOptions] = useState(['All']);
  let [teacherIdx, setTeacherIdx] = useState(0)
  let [teacherFilter, setTeacherFilter] = useState('All');
  let [classIdx, setClassIdx] = useState(0)
  let [classFilter, setClassFilter] = useState('All');
  let [columnLetters, setColumnLetters] = useState([]);
  let [firstRowIsHeader, setFirstRowIsHeader] = useState(true);
  let [gradedColumns, setGradedColumns] = useState([5, 6]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(modifiedUrl)
      .then(res => res.text())
      .then(text => {
          const responseJson = JSON.parse(text.substr(47).slice(0, -2));
          console.log(responseJson)
          setJson(responseJson);
      })

  }


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
      for (let i = 0; i < json.table.cols.length; i++) {
        letters.push(convertIdxToLetter(i));
      }
      setColumnLetters(letters);

      let newJson = json;
      for (let i = 0; i < newJson.table.rows.length; i++) {
        let total = 0;

        for (let j = 0; j < newJson.table.rows[i].c.length; j++) {

          if (newJson.table.rows[i].c[i] === null) {
            newJson.table.rows[i].c[j] = {v: null}
          }

        }

        for (let k = 0; k < gradedColumns.length; k++) {
          let num = newJson.table.rows[i].c[gradedColumns[k]];
          if (num) {
            total += num.v;
          }

        }
  
        if (firstRowIsHeader && i === 0) {
          newJson.table.rows[i].c.push({v: 'Total'})
          newJson.table.rows[i].c.push({v: 'Average'})
        } else {
          let average = total / gradedColumns.length;
          newJson.table.rows[i].c.push({v: total})
          newJson.table.rows[i].c.push({v: average})
        }


      }

      setRefactoredJson(newJson)
    }

  }, [json, firstRowIsHeader]);

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
    console.clear()
    console.log('spreadsheetUrl', spreadsheetUrl)
    console.log('modifiedUrl', modifiedUrl)
    console.log('json', json)
    console.log('refactoredJson', refactoredJson)
    console.log('teacherOptions', teacherOptions)
    console.log('classOptions', classOptions)
    console.log('teacherIdx', teacherIdx)
    console.log('teacherFilter', teacherFilter) 
    console.log('columnLetters', columnLetters)
    console.log('classFilter', classFilter)
    console.log('classIdx', classIdx)
    console.log('firstRowIsHeader', firstRowIsHeader)
  }, [spreadsheetUrl, modifiedUrl, teacherOptions, classOptions, classFilter, teacherIdx, teacherFilter, columnLetters,json, refactoredJson, firstRowIsHeader])

  return (
    <div>
      <span>{'LT Data Collection'}</span>
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
        firstRowIsHeader={firstRowIsHeader}
        setFirstRowIsHeader={setFirstRowIsHeader}
      />
      {refactoredJson && <Table
        firstRowIsHeader={firstRowIsHeader}
        table={refactoredJson.table}
        convertIdxToLetter={convertIdxToLetter}
        teacherFilter={teacherFilter}
        teacherIdx={teacherIdx}
        classFilter={classFilter}
        classIdx={classIdx}
      ></Table>}
    </div>
  )
}

export default App;
