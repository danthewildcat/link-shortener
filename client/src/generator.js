import React from "react";

async function getShortlink(val) {
  const response = await fetch('http://localhost:3000/getlink', {
    method: 'POST',
    mode: "cors",
    body: JSON.stringify({url: val}),
    headers: {
        "Content-Type": "application/json; charset=utf-8",
    },
  });
  const respJson = await response.json();
  return respJson.link;
}

export class Generator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onSubmit() {
    this.setState({link: 'foo'});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const shortLink = await getShortlink(event.target.generateInput.value);
    this.setState({
      link: shortLink,
    });
  }

  render() {
    return (
      <div className="container">
        <h1>Generate a short link</h1>
        <div className="row">
          <div className="col-lg-auto">
            <form onSubmit={this.handleSubmit}>
              <label>
                Name:
                <input name="generateInput" type="text" value={this.state.value} />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
          <a href={this.state.link} target="_blank">{this.state.link}</a>
        </div>
      </div>
    );
  }
};

