/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var Trace = React.createClass({

  removeTrace: function(e) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'DELETE',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  rawMarkup: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },

  render: function() {
    var txtClass = this.props.trace.error == "true" ?
      "status pull-right text-warning" : "status pull-right text-primary"
    var heading = "heading" + this.props.i
    var href = "#collapse" + this.props.i
    var id = "collapse" + this.props.i
    return (
      <div className="panel panel-default">
        <div className="panel-heading" role="tab" id={heading}>
          <h4 className="panel-title">
            <span className="pull-right">
              <a href="#" className="removeTrace text-warning" onClick={this.removeTrace}>
                <span className="glyphicon glyphicon-remove" ></span>
              </a>
            </span>
            <a role="button" data-toggle="collapse" data-parent="#accordion" href={href} aria-expanded="true" aria-controls={id}>
              {this.props.asset.name}
            </a>
            <div className={txtClass}>
              {this.props.trace.status} ({this.props.trace.code})
            </div>
          </h4>
        </div>
        <div id={id} className="panel-collapse collapse" role="tabpanel" aria-labelledby={heading}>
          <div className="panel-body">
            <span dangerouslySetInnerHTML={this.rawMarkup()}></span>
          </div>
        </div>
      </div>
    );
  }
});

var TraceBox = React.createClass({
  loadTracesFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: comments});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadTracesFromServer();
    setInterval(this.loadTracesFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="traceBox">
        <h3>DIP Traces</h3>
        <TraceList data={this.state.data} />
      </div>
    );
  }
});

var TraceList = React.createClass({
  render: function() {
    var traceNodes = this.props.data.map(function(current, index) {
      var url = "api/dip/traces/" + current._id
      return (
        <Trace asset={current.asset} trace={current.trace} url={url} i={index}  key={index}>
          {current.trace.message}
        </Trace>
      );
    });
    return (
      <div className="well">
        <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
          {traceNodes}
        </div>
      </div>
    );
  }
});

var TraceForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.refs.author.value.trim();
    var text = this.refs.text.value.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.refs.author.value = '';
    this.refs.text.value = '';
  },
  render: function() {
    return (
      <form className="traceForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Say something..." ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

ReactDOM.render(
  <TraceBox url="api/dip/traces" pollInterval={500} />,
  document.getElementById('content')
);
