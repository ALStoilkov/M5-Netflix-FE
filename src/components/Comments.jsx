import React, { Component } from "react";
import AddComment from "./AddComment";
import CommentList from "./CommentList";
import "../styles/css/Comments.css";
import { Row, Col, Spinner } from "react-bootstrap";

class Comments extends Component {
  state = {
    comments: {},
    isLoading: true,
    newComment: false,
  };

  handleNewCommentSubmit = (newComment) => {
    this.setState({ newComment: newComment });
  };

  componentDidUpdate = async () => {
    if (this.state.newComment === true) {
      await this.componentDidMount();
    }
  };

  componentDidMount = async () => {
    try {
      let response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${this.props.selectedMovie.imdbID}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgwMGI3MmIxZjBmYjAwMTVkOTE3MDAiLCJpYXQiOjE2MTkxODkyNDIsImV4cCI6MTYyMDM5ODg0Mn0.qo8VVZkKeFwmqiPJb5zGl4xfyS3VgS6cQh629szGmH4",
          },
        }
      );
      if (response.ok) {
        let data = await response.json();

        this.setState((state) => {
          return { comments: data, isLoading: false, newComment: false };
        });
      } else {
        console.log("something went wrong");
      }
    } catch (error) {
      alert("something went wrong");
    }
  };

  render() {
    const spinner = (
      <Spinner animation='border' role='status' className='mt-5'>
        <span className='sr-only'>Loading...</span>
      </Spinner>
    );
    return (
      <div className='commentArea'>
        <Row className='m-3'>
          <Col sm={7} md={10} lg={10}>
            <h4>{this.props.selectedMovie.title}</h4>
            {this.state.isLoading ? (
              spinner
            ) : (
              <CommentList
                comments={this.state.comments}
                style={{ zIndex: 1 }}
              />
            )}
            <Row className=''>
              <Col>
                <AddComment
                  newComment={this.state.newComment}
                  imdbid={this.props.selectedMovie.imdbID}
                  onNewCommentSubmit={this.handleNewCommentSubmit}
                  style={{ zIndex: 1 }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Comments;
