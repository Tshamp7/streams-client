import React, { Fragment } from "react";
import { connect } from "react-redux";
import { deleteStream, fetchStream } from "../../actions";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import history from "../../history";

class StreamDelete extends React.Component {
  state = {
    loading: true,
  };
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
    this.setState({ loading: false });
  }

  render() {
    const actions = (
      <Fragment>
        <button
          className="ui button negative"
          onClick={() => this.props.deleteStream(this.props.match.params.id)}
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </Fragment>
    );

    const selectedStream = this.props.stream[this.props.match.params.id];

    const content = (
      <div>
        <h2>Are you sure you want to delete the following stream?</h2>
        <div>
          <div>
            <h3>Title</h3>
            <p>{selectedStream ? selectedStream.title : null}</p>
          </div>
          <br />
          <div>
            <h3>Description</h3>
            <p>{selectedStream ? selectedStream.description : null}</p>
          </div>
        </div>
      </div>
    );

    if (this.state.loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          Stream Delete
          <Modal
            header="Delete Stream"
            content={content}
            onDismiss={() => history.push("/")}
            actions={actions}
          />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    stream: state.streams,
  };
};

export default connect(mapStateToProps, { deleteStream, fetchStream })(
  StreamDelete
);
