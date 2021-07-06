import React from "react";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {compose} from "redux";
import Flight from "./Flight/Flight";
import SearchForm from "./SearchForm/SearchForm";
import {setSearchedFlights, showUserTickets} from "../../redux/authReduser";
import withAuthRedirect from "../../HOC/withAuthRedirect";


class Tickets extends React.Component {

    componentDidMount() {
        this.props.showUserTickets()
    }


    sortFlights = (flights) => {
        if (flights) {
            let keys = Object.keys(flights) //if is searched == 10|| 10,20

            keys.sort((a, b) => {
                    return new Date(flights[a].date).getTime() - new Date(flights[b].date).getTime();
                }
            )

            return keys
        }
        alert('error')
    }

        render()  {
            return (
                <>
                    <h3>tickets list</h3>
                    <SearchForm flights={this.props.flights} setSearchedFlights={this.props.setSearchedFlights}/>
                    <div>
                        {(this.props.isSearching)
                            ? this.sortFlights(this.props.searchedFlights).map(key =>  <Flight key={key}
                                               data={this.props.flights[key]}/>)
                            : this.sortFlights(this.props.flights).map(key => <Flight key={key}
                                                                                      data={this.props.flights[key]}/>)
                        }
                    </div>
                </>
            )
        }
    }

    Tickets
.
    propTypes = {
        showUserTickets: PropTypes.func
    }

    const
    mapStateToProps = (state) => ({
        flights: state.authData.flights,
        isSearching: state.authData.isSearching,
        searchedFlights: state.authData.searchedFlights
    })

    export
    default

    compose(
        connect(  mapStateToProps, { showUserTickets, setSearchedFlights}),
        withAuthRedirect
)
(Tickets)

