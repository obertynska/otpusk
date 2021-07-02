import * as PropTypes from "prop-types";
import {Component} from "react";


class SearchForm extends Component {

    handleChange = (e) => {

        let value = e.target.value;
        let flights = this.props.flights;

        let result = {}

        let keys = Object.keys(flights)
        let filteredKeys = keys.filter(key => {
             if( flights[key].company.name.includes(value)){
                 return true
             }

            if (flights[key].company.alternativeNames) {

                let res = [];

                flights[key].company.alternativeNames.map(altern => {
                    if (altern.includes(value)) {
                        res.push(0)
                    }
                })


                if (res.includes(0)) {
                    return true
                } else {
                    return false
                }

            }
        })

        filteredKeys.map(key => result[key] = flights[key])

        this.props.setSearchedFlights(result)


    }

    render() {
        return (
            <form onChange={this.handleChange}>
                <input/>
            </form>
        )
    }
}

SearchForm.propTypes = {handleSubmit: PropTypes.func}


export default SearchForm