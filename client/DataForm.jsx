import React from 'react';

const DataForm = (props) => {

  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <label name={'Spreadsheet URL'} forHtml={'Spreadsheet URL'}></label>
        <input htmlType={'text'} id={'Spreadsheet URL'}></input>
      </form>
    </div>
  )

}

export default DataForm;