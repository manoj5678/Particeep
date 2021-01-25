import React, { Component } from 'react';
import { connect }          from 'react-redux';
import MediaCard            from "./movieCard";
import Grid                 from "@material-ui/core/Grid";
import Category             from "./category";
import Button from  "@material-ui/core/Button"

const Pagination = (prop) => {
    let buttons = [];
    for (let i = 1; i <= prop.pages; i++) {
        buttons.push(
            <Button
                key={i}
                variant={prop.activePage === i ? "contained" :"outlined"}
                onClick={() => prop.selected(i)}
                color="primary"
                style={{margin: 10}}
            >
                {i}
            </Button>,
        );
    }
    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <Button variant="outlined" style={{margin: 10}} color="primary" onClick={() => (prop.activePage - 1 > 0 ? prop.selected(prop.activePage - 1) : {})}>Previous</Button>
            {buttons}
            <Button variant="outlined" style={{margin: 10}} color="primary" onClick={() => (prop.activePage < prop.pages ? prop.selected(prop.activePage + 1) : {})}>Next</Button>
        </div>
    );
};

class AllMovies extends Component {
    constructor(props) {
        super (props);
        let categories = this.props.data.map(d => d.genres)
        categories = categories.flat()
        categories = categories.filter((c,index) => categories.findIndex(cat => cat === c) === index)
        this.state = {
            data: this.props.data.sort((a,b) => {return a.id - b.id}),
            categories: categories,
            showData: this.props.data.sort((a,b) => {return a.id - b.id}).slice(0,3),
            selectedCategory: null,
            filteredData: null,
            activePage: 1,
            pages: Math.ceil(this.props.data.length / 8),
            startNumber: 0,
            endNumber: 8,
        }
    }

    handleChange(m) {
        let updatedData = this.state.data.filter((movie) => movie.id !== m.id)
        let data = [...updatedData, m]
        this.setState({data: data.sort((a,b) => {return a.id - b.id})})
        this.props.dispatch({
            type:'LOAD_DATA',
            data: this.state.data,
        });
    }

    handleChangeCategory(category) {
        const {data} = this.state
        let newData = data.filter(d => d.genres.includes(category))
        this.setState({selectedCategory: category, filteredData: newData && newData.length ? newData : null})
    }

    handleDelete () {
        const {categories, data, selectedCategory} = this.state
        let newCat = categories.filter(c => c !== selectedCategory)
        let newData = data.filter(d => !d.genres.includes(selectedCategory))
        this.setState({categories: newCat, data: newData, filteredData: null})
        this.props.dispatch({
            type:'DELETE_CATEGORY',
            data: selectedCategory,
        });
    }

    render() {
        return (
            <div>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <Category categories={this.state.categories} onChange={(category) => this.handleChangeCategory(category)}/>
                    {this.state.selectedCategory ? <Button color="secondary" onClick={() => this.handleDelete()}> Delete all </Button> : null}
                </div>
                <Grid container spacing={3} style={{padding: 20}}>
                    {this.state.filteredData && this.state.filteredData.length ?
                        this.state.filteredData.map((d) => <Grid item xs={6} sm={3}><MediaCard key={d.id} movieData={d} onChange={(movie) => this.handleChange(movie)}/></Grid>) :
                        this.state.data.slice(this.state.startNumber, this.state.endNumber).map((d) => <Grid item xs={6} sm={3}><MediaCard key={d.id} movieData={d} onChange={(movie) => this.handleChange(movie)}/></Grid>)}
                </Grid>
                <Pagination
                    activePage={this.state.activePage}
                    pages={this.state.pages}
                    selected={(i) =>
                        this.setState({
                            activePage: i,
                            startNumber: i * 8 - 8,
                            endNumber: i * 8,
                        })
                    }
                />
            </div>
        );
    }
}
export default connect()(AllMovies);
