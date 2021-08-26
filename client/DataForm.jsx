import React from 'react';

const DataForm = (props) => {

  return (
  <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
    <div style={{border: '1px solid black', borderRadius: '5px', padding: '5px', backgroundColor: '#FF9AA2', margin: '5px'}}>
      <form onSubmit={props.handleSubmit}>
        <label
          name={'Spreadsheet URL'}
          htmlFor={'spreadsheetURL'}>
            {'Spreadsheet URL: '}
        </label>
        <input
          type={'text'}
          id={'spreadsheetURL'}
          defaultValue={props.spreadsheetUrl}
          onChange={(e) => {
            let url = e.target.value;
            props.setSpreadsheetUrl(url);
          }}>
        </input>
        <input
          type={'submit'}>
        </input>
      </form>
      <div>
        <div>{'To allow this program to have access to your spreadsheet:'}</div>
        <ol>
          <li>{'Open spreadsheet from Google Drive'}</li>
          <li>{'Click "Share" in top right corner'}</li>
          <li>{'Click "Change to anyone with link"'}</li>
        </ol>
      </div>
    </div>
    <div style={{border: '1px solid black', borderRadius: '5px', padding: '5px', backgroundColor: '#B5EAD7', margin: '5px'}}>
      <div>{'Filter Parameters'}</div>
      <form onSubmit={props.handleSubmit}>
        <label
          name={'Teacher Column'}
          htmlFor={'teacherColumn'}>
            {'Teacher Column: '}
        </label>
        <select
          id={'teacherColumn'}
          onChange={(e) => {
            let idx = props.convertLetterToIdx(e.target.value);
            props.setTeacherIdx(idx);
          }}>
            {props.columnLetters.map((letter, idx) => {
              return <option key={JSON.stringify(letter + idx)} value={letter}>{letter}</option>
            })}
        </select>
        <br/>
        <label
          name={'Class Column'}
          htmlFor={'classColumn'}>
            {'Class Column: '}
        </label>
        <select id={'classColumn'} onChange={(e) => {
          let idx = props.convertLetterToIdx(e.target.value);
          props.setClassIdx(idx);
        }}>
          {props.columnLetters.map((letter, idx) => {
            return <option key={JSON.stringify(letter, idx)} value={letter}>{letter}</option>
          })}
        </select>
        <br/>
        <label
          name={'Date Column'}
          htmlFor={'dateColumn'}>
            {'Date Column: '}
        </label>
        <select id={'dateColumn'} onChange={(e) => {
          let idx = props.convertLetterToIdx(e.target.value);
          props.setDateIdx(idx);
        }}>
          {props.columnLetters.map((letter, idx) => {
            return <option key={JSON.stringify(letter + idx)} value={letter}>{letter}</option>
          })}
        </select>
        <br/>
        <label
          name={'First Name Column'}
          htmlFor={'firstNameColumn'}>
            {'First Name Column: '}
        </label>
        <select
          id={'firstNameColumn'}
          onChange={(e) => {
            let idx = props.convertLetterToIdx(e.target.value);
            props.setFirstNameIdx(idx);
          }}>
            {props.columnLetters.map((letter, idx) => {
              return <option key={JSON.stringify(letter + idx)} value={letter}>{letter}</option>
            })}
        </select>
        <label
          name={'Last Name Column'}
          htmlFor={'lastNameColumn'}>
            {'Last Name Column: '}
        </label>
        <select
          id={'lastNameColumn'}
          onChange={(e) => {
            let idx = props.convertLetterToIdx(e.target.value);
            props.setLastNameIdx(idx);
          }}>
            {props.columnLetters.map((letter, idx) => {
              return <option key={JSON.stringify(letter + idx)} value={letter}>{letter}</option>
            })}
        </select>
        <br/>
        <span>{'Select graded columns:'}</span>
        <br/>
        {props.columnLetters.map((letter, idx) => {
          return <span key={JSON.stringify(letter + idx)}
          style={{border: '1px black solid', padding: '3px', marginRight: '-1px'}}>
              <label
                htmlFor={letter + idx}>
                  {letter + ':'}
              </label>
              <input
                type={'checkbox'}
                value={letter}
                id={letter + idx}
                onChange={(e) => {
                  let columns = JSON.parse(JSON.stringify(props.gradedColumns))
                  columns[idx] = e.target.checked;
                  props.setGradedColumns(columns);
                }}/>
          </span>
          })}
          <br/>
        <label
        htmlFor={'maxPoints'}>{'Max Points Per Question'}
        </label>
        <input
          type={'number'}
          defaultValue={props.maxPointsPerQuestion}
          min={1}
          onChange={(e) => {
            props.setMaxPointsPerQuestion(Number(e.target.value))
          }}>
        </input>
        <div style={{border: '1px solid black', borderRadius: '5px', padding: '5px'}}>
          <div>{'(optional)'}</div>
          <label
          htmlFor={'maxScores'}>
            {' Only Show Max Score Per Student'}
          </label>
          <input
          type={'checkbox'}
          onChange={(e) => {
            props.setMaxScore(e.target.checked)
          }}
          ></input>
        </div>
      </form>
      <br/>
    </div>
    <div style={{border: '1px solid black', borderRadius: '5px', padding: '5px', margin: '5px', backgroundColor: '#ebedeb'}}>
      <div>{'Filter:'}</div>
      <form onSubmit={props.handleSubmit}>
        <label
          name={'Teacher'}
          htmlFor={'chooseTeacher'}>
            {'Teacher: '}
        </label>
        <select
          id={'chooseTeacher'}
          defaultValue={props.teacherFilter}
          onChange={(e) => {
            props.setTeacherFilter(e.target.value)
          }}>
          {props.teacherOptions.map((option) => {
            return <option key={JSON.stringify(option)} value={option}>{option}</option>
          })}
        </select>
        <br/>
        <label
          name={'Class'}
          htmlFor={'chooseClass'}>
            {'Class: '}
        </label>
        <select
          id={'chooseClass'}
          defaultValue={props.classFilter}
          onChange={(e) => {
            props.setClassFilter(e.target.value)
          }}>
          {props.classOptions.map((option, idx) => {
            return <option key={JSON.stringify(option + idx)} value={option}>{option}</option>
          })}
        </select>
        <br/>
        <label
          name={'Start Date'}
          htmlFor={'startDate'}>
            {'Start Date: '}
        </label>
        <input
          id={'startDate'}
          type={'date'}
          defaultValue={props.startOfDateRange}
          max={props.maxDate}
          onInput={(e) => {
            props.setStartOfDateRange(e.target.value)
          }}>
        </input>
        <br/>
        <label
          name={'End Date'}
          htmlFor={'endDate'}>
            {'End Date: '}
        </label>
        <input
          id={'endDate'} 
          type={'date'}
          defaultValue={props.endOfDateRange}
          max={props.maxDate}
          onInput={(e) => {
            props.setEndOfDateRange(e.target.value)
          }}>
        </input>
          <br/>
          <label htmlFor={'sort'}>{'Sort: '}</label>
        <select
          defaultValue={props.sort}
          onChange={(e) => {
            props.setSort(e.target.value);
          }}>
          <option value={'Most Recent'}>{'Most Recent'}</option>
          <option value={'Least Recent'}>{'Least Recent'}</option>
          <option value={'Last Name'}>{'Last Name'}</option>
          <option value={'Class'}>{'Class'}</option>
          <option value={'Teacher'}>{'Teacher'}</option>
        </select>
        <br/>
        <button
        onClick={() => {
          props.filter();
        }}>{'Filter'}
        </button>
      </form>
    </div>
  </div>
  )

}

export default DataForm;