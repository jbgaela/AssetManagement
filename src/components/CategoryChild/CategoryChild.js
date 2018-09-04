import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import Dialog from 'react-bootstrap-dialog'
import axios from 'axios'; 
class  CategoryChild extends Component {
  constructor(props){
      super(props);
      this.onDialogBox = this.onDialogBox.bind(this);
  }
    render(){
        return (
            <Panel.Footer>
                <Button bsClass={this.props.actionInsertState + " btn btn-flat btn-primary"  } 
                    onClick={ this.props.actionInsert}>Insert Category
                </Button>&nbsp;
                <Button bsClass={this.props.actionUpdateHidden + " btn btn-flat btn-primary" } 
                onClick={this.props.actionUpdate}>Update Category</Button>&nbsp;
                <Dialog ref={(el) => { this.dialog = el }} />
             </Panel.Footer>                                                    
        );
    }
    //Category Common
    IsInsertHidden(val) {
        if (val === 1) {
            return "hidden";
        }
        else {
            return "";
        }
    }
    IsUpdateHidden(value) {
        if (value === 1) {
            return "hidden";
        }
        else {
            return "";
        }
    }
    onDialogBox(actionType, titleMessage, bodyMessage) {
        var form = this;
        if (actionType === true) {
             form.dialog.show({
                title: titleMessage,
                body: bodyMessage,
                actions: [
                    Dialog.OKAction()
                ],
                bsSize: 'medium',
                onHide: (dialog) => {
                    dialog.hide()
                    console.log('closed by clicking background.')
                },
            });
        }
        else {
            form.dialog.hide();
        }
    }
    getInputHiddenState(value) {
     
        if (value === 1) {
            return true;
        }
        else {
            return false;
        }
    }
    getValidationState(val) {

        if (val === 0) {
            return "error";
        }
        else {
            return null;
        }
    }
    parentAxios(methodType, url, param,token) {
        
        return axios({
            url: url,
            method: methodType,
            data: param,
            headers: {
                'Authorization': 'Bearer '+token,
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
    }
    renderShowsTotal(start, to, total) {
        return (
            <p style={{ color: 'blue' }}>
                From {start} to {to}, Total Record(s) is {total}
            </p>
        );
    }
    pagingTable(val){
        const options = {
            page: 1,  // which page you want to show as default
            sizePerPageList: [{
                text: '5', value: 5
            }, {
                text: '10', value: 10
            }, {
                text: 'All', value: val
            }], // you can change the dropdown list for size per page
            sizePerPage: 5,  // which size per page you want to locate as default
            pageStartIndex: 1, // where to start counting the pages
            paginationSize: 3,  // the pagination bar size.
            prePage: 'Prev', // Previous page button text
            nextPage: 'Next', // Next page button text
            firstPage: 'First', // First page button text
            lastPage: 'Last', // Last page button text
            paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
            paginationPosition: 'both'  // default is bottom, top and both is all available
            // hideSizePerPage: true > You can hide the dropdown for sizePerPage
            // alwaysShowAllBtns: true // Always show next and previous button
            // withFirstAndLast: false > Hide the going to First and Last page button
        };
        return options;
    }
    


}
export default CategoryChild;