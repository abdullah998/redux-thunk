const reducer = (state, action) => {
   switch (action.type) {
      case 'SEARCH':
         {
            state.items.push(action.payload.query)
            return { items: [...state.items] }
         }

      default: return state
   }
}
export default reducer;