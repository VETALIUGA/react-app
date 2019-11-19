import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import { Card } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

function GridFavor(props) {
  if (props.repos.length) {
    return (
      <div className="grid-favorites-wrap">
        <Button variant="danger" block onClick={() => props.deleteAllFav()}>Delete All Favorites</Button>
        <div className="grid-favorites">
          {props.repos.reverse().map((item) =>
            <div className="grid-item">
              <Card bg="dark" style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title className="text-white">{item.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-white">ID: {item.id}</Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-white">Watchers: {item.watchers}</Card.Subtitle>
                  <Card.Link className="repos-link" target="_blank" href={'https://github.com/' + item.full_name}>Visit repository</Card.Link>
                  <Button variant="danger" block onClick={() => props.removeFromFavHandler(item)}>Remove from favorites</Button>
                </Card.Body>
              </Card>
            </div>
          )}
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="grid-favorites-wrap">
        <h3>You haven't added any repositories yet =(</h3>
        <img src="http://giphygifs.s3.amazonaws.com/media/6uGhT1O4sxpi8/giphy.gif"></img>
      </div>
    )
  }

}
export default GridFavor;