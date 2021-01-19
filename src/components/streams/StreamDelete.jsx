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

  renderActions() {
    const { id } = this.props.match.params;

    return (
      <Fragment>
        <button
          className="ui button negative"
          onClick={() => this.props.deleteStream(id)}
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </Fragment>
    );
  }

  renderContent() {
    const selectedStream = this.props.stream;

    return (
      <div>
        <h3>Are you sure you want to delete the following stream?</h3>
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
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <Modal
          header="Delete Stream"
          content={this.renderContent()}
          onDismiss={() => history.push("/")}
          actions={this.renderActions()}
        />
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { deleteStream, fetchStream })(
  StreamDelete
);
