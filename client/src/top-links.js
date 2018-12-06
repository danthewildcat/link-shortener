import React from "react";

async function getTopLinks(first, offset) {
  const searchParams = new URLSearchParams();
  if (first != null) {
    searchParams.append('first', first);
  }
  if (offset != null) {
    searchParams.append('offset', offset);
  }
  const url = new URL('http://localhost:3000/toplinks');
  url.search = searchParams;
  const response = await fetch(url.toString(), {
    method: 'GET',
    mode: "cors",
  });
  const respJson = await response.json();
  return respJson;
}

class LinkRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td>{this.props.obj.key + 1}</td>
        <td>{this.props.obj.link.originalUrl}</td>
        <td>{this.props.obj.link.count}</td>
        <td><a href={this.props.obj.link.shortUrl} target="_blank">{this.props.obj.link.shortUrl}</a></td>
      </tr>
    )
  }
}

export class TopLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first: 100,
      offset: 0,
      linksList: [],
    };
  }

  async refreshLinks() {
    const {topLinks} = await getTopLinks(this.state.first, this.state.offset);
    this.setState({
      linksList: topLinks,
    });
  }

  componentDidMount() {
    this.refreshLinks();
    this.interval = setInterval(() => this.refreshLinks(), 30000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="container">
      <h2>Most visited links</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>URL</th>
            <th>Visits</th>
            <th>Short Link</th>
          </tr>
        </thead>
        <tbody>
            {this.state.linksList.map((link, i) => <LinkRow obj={{link, key: i}} key={i} />)}
        </tbody>
      </table>
      </div>
    );
  }
};

