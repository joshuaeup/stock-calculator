import "./App.css";
import axios from "axios";
import { Component } from "react";
// import dotenv from "dotenv";
// dotenv.config();

// const { API_KEY } = process.env;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: [
        {
          name: "SPY",
          percentage: 40,
          stockPrice: 0,
          investmentAmount: 0,
        },
        {
          name: "ARKK",
          percentage: 25,
          stockPrice: 0,
          investmentAmount: 0,
        },
        {
          name: "SPYD",
          percentage: 15,
          stockPrice: 0,
          investmentAmount: 0,
        },
        {
          name: "TSLA",
          percentage: 10,
          stockPrice: 0,
          investmentAmount: 0,
        },
        {
          name: "ETH",
          percentage: 5,
          stockPrice: 0,
          investmentAmount: 0,
        },
        {
          name: "AAPL",
          percentage: 5,
          stockPrice: 0,
          investmentAmount: 0,
        },
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
          stockPrice: this.getStockValue("SPY").then((data) => data),
          investmentAmount: this.state.inputValue * 0.4,
        },
        {
          name: "ARKK",
          percentage: 25,
          stockPrice: this.getStockValue("ARKK").then((data) => data),
          investmentAmount: this.state.inputValue * 0.25,
        },
        {
          name: "SPYD",
          percentage: 15,
          stockPrice: this.getStockValue("SPYD").then((data) => data),
          investmentAmount: this.state.inputValue * 0.15,
        },
        {
          name: "TSLA",
          percentage: 10,
          stockPrice: this.getStockValue("TSLA").then((data) => data),
          investmentAmount: this.state.inputValue * 0.1,
        },
        {
          name: "ETH",
          percentage: 5,
          stockPrice: this.getStockValue("ETH").then((data) => data),
          investmentAmount: this.state.inputValue * 0.05,
        },
        {
          name: "AAPL",
          percentage: 5,
          stockPrice: this.getStockValue("AAPL").then((data) => data),
          investmentAmount: this.state.inputValue * 0.05,
        },
      ],
    });

    // console.log(this.getStockValue("SPY").then((data) => data));
    // this.getStockValue("SPY").then((data) => console.log(data));
  };

  getStockValue = async (ticker) => {
    const value = await axios
      .get(
        `https://api.polygon.io/v2/aggs/ticker/${ticker}/prev?adjusted=true&apiKey=4GQAsMuf0zDBlz0_ymOVxT_4UJQp17Ve`
      )
      .then((item) => item.data.results[0].c);

    return value;
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
                <th className="table-heading">Stock Price</th>
                <th className="table-heading">Investment Amount</th>
              </tr>
            </tbody>
            {this.state.stocks.map((stock, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <td className="table-item">{stock.name}</td>
                    <td className="table-item">{stock.percentage}%</td>
                    <td className="table-item">{"$" + stock.stockPrice}</td>
                    <td className="table-item">
                      {"$" + stock.investmentAmount.toFixed(2)}
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
