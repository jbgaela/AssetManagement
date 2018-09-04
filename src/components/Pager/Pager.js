import React, { Component } from 'react';
class Pager extends Component {
    constructor(props) {
        super(props);
    }
    // sizePerPage() {
    //     console.log(this.props.totalResult);
    //     let htmlElement;
    //     for (let i = 1; i <= this.props.sizePerPage; i++) {
    //         htmlElement = <li className="page-item" key={i}>
    //             <a className="page-link" href="#">{i}</a>
    //         </li>;
    //         console.log(i);
    //         //    return( <li className="page-item" key={i}>
    //         //         <a className="page-link" href="#">{i}</a>
    //         //     </li>)
    //     }
    // }
    render() {
        let arrayofPager = [];
        for (let i = 1; i <= this.props.sizePerPage; i++) {
            arrayofPager.push(i);
        }
        if (arrayofPager.length == 0) {        
           return null;
        }
        else {
            var objectParam = this;
            console
            return (
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {
                             Object.keys(arrayofPager).map(function(key,i){
                                return (<li className="page-item" key={parseInt(i)+1}>
                                            <a className="page-link" href="#" onClick={objectParam.props.pageOnClick.bind(objectParam,parseInt(i)+1)}>{parseInt(i)+1}</a>
                                        </li>);
                             })
                        }
                   </ul>
                </nav>
            );
        }
    }
}

export default Pager;