import React from 'react';

const DataForm = (props) => {

  

  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <label name={'Spreadsheet URL'} htmlFor={'spreadsheetURL'}>{'Spreadsheet URL: '}</label>
        <input type={'text'} id={'spreadsheetURL'} onChange={(e) => {
          let url = e.target.value;
          props.setSpreadsheetUrl(url);
        }}></input>
        <input type={'submit'} ></input>
      </form>
      <div>
        <div>{'To allow this program to have access to your spreadsheet:'}</div>
        <ol>
          <li>{'Open spreadsheet from Google Drive'}</li>
          <li>{'Click "Share" in top right corner'}</li>
          <li>{'Click "Change to anyone with link"'}</li>
        </ol>
      </div>
      <div>{'Filter Parameters'}</div>
      <form onSubmit={props.handleSubmit}>
        <label name={'Teacher Column'} htmlFor={'teacherColumn'}>{'Teacher Column: '}</label>
        <select id={'teacherColumn'} onChange={(e) => {
          let idx = props.convertLetterToIdx(e.target.value);
          props.setTeacherIdx(idx);
        }}>
          {props.columnLetters.map((letter) => {
            return <option value={letter}>{letter}</option>
          })}
        </select>
        <br/>
        <label name={'Class Column'} htmlFor={'classColumn'}>{'Class Column: '}</label>
        <select id={'classColumn'} onChange={(e) => {
          let idx = props.convertLetterToIdx(e.target.value);
          props.setClassIdx(idx);
        }}>
          {props.columnLetters.map((letter) => {
            return <option value={letter}>{letter}</option>
          })}
        </select>
        <br/>
        <label name={'Is the first row the header?'} htmlFor={'firstRowIsHeader'}>{'Is the first row the header?'}</label>
        <input type={'checkbox'} checked={props.firstRowIsHeader} onChange={() => {
          props.setFirstRowIsHeader(!props.firstRowIsHeader);
        }}></input>
        <br/>
        <span>{'Select graded columns:'}</span>
        <br/>
        {props.columnLetters.map((letter, idx) => {
          return <><label htmlFor={letter + idx}>{letter + ':'}</label><input type={'checkbox'} value={letter} id={letter + idx}/></>
        })}
      </form>
      <br/>
      <div>{'Filter'}</div>
      <form onSubmit={props.handleSubmit}>
        <label name={'Teacher'} htmlFor={'chooseTeacher'}>{'Teacher: '}</label>
        <select id={'chooseTeacher'} onChange={(e) => {
          props.setTeacherFilter(e.target.value)
        }}>
          {props.teacherOptions.map((option) => {
            return <option value={option}>{option}</option>
          })}
        </select>
        <label name={'Class'} htmlFor={'chooseClass'}>{'Class: '}</label>
        <select id={'chooseClass'} onChange={(e) => {
          props.setClassFilter(e.target.value)
        }}>
          {props.classOptions.map((option) => {
            return <option value={option}>{option}</option>
          })}
        </select>
      </form>
    </div>
  )

}

export default DataForm;