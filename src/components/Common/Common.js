import React, { Component } from 'react';
import axios from 'axios';
import Dialog from 'react-bootstrap-dialog';
class Common extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actionType: "",
            errorBodyMessage: "Please enter the required field",
            titleConfirmMessage: "Confirmation Message",
            titleErrorMessage: "You have encountered an error",
            confirmationBodyMessage: "You have successfully ",
            isInputValid: null,
            isInputHidden: "hidden",
            isInsertHidden: '',
            isUpdateHidden: 'hidden',
            token: localStorage.getItem("token")


        }
        //this.cellButton = this.cellButton.bind(this);
        //this.handleSelectUpdate = this.handleSelectUpdate.bind(this);
        this.pagingTable = this.pagingTable.bind(this);
        this.handleState = this.handleState.bind(this);
        this.setStateofValue = this.setStateofValue.bind(this);
    }
    parentAxios(methodType, url, param) {
        //console.log(param);
    
        return axios({
            url: url,
            method: methodType,
            data: param,
            headers: {
                'Authorization': 'Bearer '+this.state.token,
                'Content-Type': 'application/json; charset=utf-8',
               
            }
        });
    }
    setStateofValue(parameter,value){
        this.setState({
            actionType:"value"
        });
        console.log(this.state.actionType);
    }
    handleState() {
         return this.state;
    }

    renderShowsTotal(start, to, total) {
        return (
            <p style={{ color: '#337ab7' }}>
                From {start} to {to}, Total Record(s) is {total}
            </p>
        );
    }
    pagingTable(val) {
        return {
            page: 1,  // which page you want to show as default
            sizePerPageList: [
                {
                    text: '5', value: 5
                },
                {
                    text: '10', value: 10
                },
                {
                    text: 'All', value: val
                }
            ], // you can change the dropdown list for size per page
            sizePerPage: 5,  // which size per page you want to locate as default
            pageStartIndex: 1, // where to start counting the pages
            paginationSize: 3,  // the pagination bar size.
            prePage: 'Prev', // Previous page button text
            nextPage: 'Next', // Next page button text
            firstPage: 'First', // First page button text
            lastPage: 'Last', // Last page button text
            paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
            paginationPosition: 'both'  // default is bottom, top and both is all available
        };
    }
    

    populateWhenGridIsSelected(row, url,thiss,component){
        let parentClass = thiss;
        let funcParam = {
            methodType:"GET",
            url:url+"/"+row.id
        };
       let data = [];
       this.parentAxios(funcParam.methodType, funcParam.url, null).then(result => {
                data.push(result.data);
                let res;
                console.log(data);
                data.forEach((val,index)=>
                {
                    res={ Id:val.id, Name:val.name };      
                    if(component==="harddisk" ||component==="memory" ||component==="videocard" )
                      res={ Id:val.id, Name:val.size };      
                       
                    Object.keys(res).forEach((item,index)=>{
                        let param = component + item; 
                            parentClass[param].value = res[item];
                    })
                })
       })
    }
    populateAssetWhenGridIsSelected(row, url,thiss){
        let parentClass = thiss;
        let funcParam = {
            methodType:"GET",
            url:url+"/"+row.id
        };
       console.log(parentClass);
       let data = [];
       console.log(funcParam);
       this.parentAxios(funcParam.methodType, funcParam.url, null).then(result => {
                data.push(result.data);
               
                let record = {
                    id: 1,
                    serialNo: "G3NXCV09860411H",
                    assetTag: "AFAF",
                    battery: "ASFAF",
                    adapter: "ASFAF",
                    name: "AFASF",
                    assignedTo: "ASFASF",
                    deliveryDate: "2018-07-19T00:00:00",
                    supplierId: 2,
                    modelId: 1,
                    processorId: 1,
                    memoryId: 1,
                    videoCardId: 2,
                    hardDiskId: 1,
                    poNo: "AS",
                    drNo: "ADASD",
                    siNo: "ASAF",
                    macAddress: "AFSF",
                    ipAddress: "ASFSAF",
                    status: 3,
                    manufacturerId: 2,
                    categoryId: 15,
                    purchaseDate: "2018-07-04T00:00:00",
                    purchaseCost: 32332,
                    notes: "AFSAF"
                };
                data.forEach((val,index)=>
                {
                    console.log(val);
                    
                    Object.keys(record).forEach((item,index)=>
                    {
                        var fieldName = item.trim('');
                        if(fieldName==="purchaseDate" || fieldName==="deliveryDate")
                        {
                                      
                        }
                        else{
                                let field = parentClass[fieldName];
                                field.value = val[item];
                               }
                    })
                })
       })
    }
    onDialogBox(actionType, titleMessage, bodyMessage,parentDialog) {
   
        var form = parentDialog;
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
    dialogIsOpen(value,actionType)
    {
        var parentDialog = this;

        if(value===1)
        {
           
            let message =this.state.confirmationBodyMessage +" " + actionType;
            this.onDialogBox(true, this.state.titleConfirmMessage,message,parentDialog );
            setTimeout(this.onDialogBox, 2500,false, this.state.titleConfirmMessage, this.state.confirmationBodyMessage,parentDialog );
        }
        else{
            this.onDialogBox(true, this.state.titleErrorMessage, this.state.errorBodyMessage,parentDialog);
            setTimeout(this.onDialogBox, 2500,false, this.state.titleErrorMessage, this.state.errorBodyMessage,parentDialog );
        }
    }
    getInputHiddenState(value) {     
        return value===1?"hidden":"";
    }
    getValidationState(value) {
        return value===1?null:"error";
    }

    // SupplierloadData(url) {
    //    return axios.get(url + "/?ShowAll=true");
    // }



    render() {
        return ( <Dialog ref={(el) => { this.dialog = el }} />);
    }

}
export default Common;