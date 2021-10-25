import "./App.css";
import { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: [
        {
          name: "SPY",
          percentage: 40,
          price: 0,
        },
        {
          name: "ARKK",
          percentage: 25,
          price: 0,
        },
        {
          name: "TSLA",
          percentage: 15,
          price: 0,
        },
        {
          name: "SPYD",
          percentage: 10,
          price: 0,
        },
        {
          name: "ETH",
          percentage: 10,
          price: 0,
        },
        // {
        //   name: "AAPL",
        //   percentage: 5,
        //   price: 0,
        // },
      ],
      inputValue: "",
    };
  }

  calculateHandler = (e) => {
    e.preventDefault();
    this.setState({
      stocks: [
        {
          name: "SPY",
          percentage: 40,
          price: this.state.inputValue * 0.4,
        },
        {
          name: "ARKK",
          percentage: 25,
          price: this.state.inputValue * 0.25,
        },
        {
          name: "TSLA",
          percentage: 15,
          price: this.state.inputValue * 0.15,
        },
        {
          name: "SPYD",
          percentage: 10,
          price: this.state.inputValue * 0.1,
        },
        {
          name: "ETH",
          percentage: 10,
          price: this.state.inputValue * 0.1,
        },
        // {
        //   name: "AAPL",
        //   percentage: 5,
        //   price: this.state.inputValue * 0.05,
        // },
      ],
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Stock Calculator</h1>
          <table id="investment-table">
            <tbody>
              <tr>
                <th className="table-heading">Stock</th>
                <th className="table-heading">Percentage</th>
                <th className="table-heading">Investment Amount</th>
              </tr>
            </tbody>
            {this.state.stocks.map((stock, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <td className="table-item">{stock.name}</td>
                    <td className="table-item">{stock.percentage}%</td>
                    <td className="table-item">
                      {"$" + stock.price.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
          <div>
            <input
              id="investment"
              placeholder="Investment"
              type="text"
              value={this.state.inputValue}
              onChange={(e) => this.setState({ inputValue: e.target.value })}
            />
            <button
              id="calculate-btn"
              value="Submit"
              onClick={this.calculateHandler}
            >
              Submit
            </button>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
