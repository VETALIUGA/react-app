import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import { Card } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import Logo from '../media/github-logo-face.svg'

function GridSearch(props) {
    return (
        <div className="grid-search-wrap">
            <form onSubmit={props.submitHandler}>
                <input type="text" name="name"/>
                <input type="submit" value="Search"/>
            </form>
            {/* <form>
                <input type="text" name="name" onChange={props.inputChangeHandler}/>
                <input type="submit" value="Search" onClick={props.searchButtonHandler}/>
            </form> */}
            <div className="grid-search">
                <div className={"loader " + props.loader}>
                    <img src={Logo}></img>
                </div>
                {props.repos.map((item, index) => {
                    const checkFavor = props.buttonCheckHandler(item, props.favorites);
                    return (
                        <div className="grid-item" key={index}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">ID: {item.id}</Card.Subtitle>
                                    <Card.Subtitle className="mb-2 text-muted">Watchers: {item.watchers}</Card.Subtitle>
                                    <Card.Link className="repos-link" target="_blank" href={'https://github.com/' + item.full_name}>Visit repository</Card.Link>
                                    <Button variant="success" block disabled={checkFavor} onClick={() => props.addToFavHandler(item)}>{checkFavor ? "Added" : "Add to favorites"}</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    )
}
export default GridSearch;