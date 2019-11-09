import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import { Card } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import Logo from '../media/github-logo-face.svg'

function GridSearch(props) {
    const buttonContent = (currentRepos) => {
        if(props.favorites) {
            const arr = props.favorites.filter((item) => {
                return item.id == currentRepos.id;
            })
    
            if (arr.length) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    return (
        <div className="grid-search-wrap">
            <form onSubmit={props.submitHandler}>
                <input type="text" name="name" />
                <input type="submit" value="Search" />
            </form>
            <div className="grid-search">
                <div className={"loader " + props.loader}>
                    <img src={Logo}></img>
                </div>
                {props.repos.map((item) => {
                    const checkFavor = buttonContent(item);
                    return (
                        <div className="grid-item">
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