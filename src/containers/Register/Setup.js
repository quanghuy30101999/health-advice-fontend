import MarkdownIt from "markdown-it";
import { useEffect, useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useHistory } from "react-router";
import "./Setup.scss";
import { useParams } from "react-router-dom";
import axios from "axios";

const mdParser = new MarkdownIt();

function Setup() {
  const { id } = useParams();

  let history = useHistory();
  const [state, setState] = useState({
    contentMarkdown: "",
    contentHTML: "",
    description: "",
  });
  function handleEditorChange({ html, text }) {
    setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  }
  return (
    <div className="setup-doctor">
      <div className="title">Thông tin bác sĩ</div>
      <div className="more-infor">
        <div className="content-left form-group">
          <label>Mô tả</label>
          <textarea
            className="form-control"
            onChange={(e) => {
              setState({
                description: e.target.value,
              });
            }}
          ></textarea>
        </div>
      </div>
      <div className="editor">
        <label>Kinh nghiệm làm việc</label>
        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
      </div>

      <button className="save" onClick={() => {}}>
        Finish Setup
      </button>
    </div>
  );
}

export default Setup;
