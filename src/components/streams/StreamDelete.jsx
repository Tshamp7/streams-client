import React from "react";
import { connect } from "react-redux";
import { deleteStream } from "../../actions";
import { Link } from "react-router-dom";
import Modal from "../Modal";

const StreamDelete = (props) => {
  const actions = (
    <div>
      <button
        className="ui button negative"
        onClick={() => props.deleteStream(props.match.params.id)}
      >
        Delete
      </button>
      <Link to="/" className="ui button">
        Cancel
      </Link>
    </div>
  );

  return (
    <div>
      Stream Delete
      <Modal
        header="Delete Stream"
        content="Are you sure you want to delete this stream?"
        route="/"
        actions={actions}
      />
    </div>
  );
};

export default connect(null, { deleteStream })(StreamDelete);
