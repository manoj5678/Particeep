const postReducer = (state = [], action) => {
    switch(action.type) {
        case 'LOAD_DATA':
            return action.data;
        case 'UPDATE_DATA':
            return state.map((movie) => {
                if (movie.id === action.id) {
                    return {
                        ...movie,
                        like: action.data.like,
                        dislike: action.data.dislike,
                    }
                } else return movie;
            })
        case 'DELETE_CATEGORY':
            return state.filter((movie)=> !movie.genres.includes(action.data.category));
        default:
          return state;
      }
}
export default postReducer;
