import { connect } from 'react-redux'
import ListOfCities from '../component/CityList'
import { search } from '../actions';


const mapStateToProps = (state) => {
   return {
      list: state.items//Change in properties will trigger change in state
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      getRequest: () => dispatch(search())//event is mapped to dispatch function
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOfCities);