import "./App.css";
import axios from "axios";
import { Component } from "react";

const API_KEY = process.env.REACT_APP_API_KEY;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: [
        {
          name: "SPY",
          percentage: 40,
          investmentAmount: 0,
          stockPrice: 0,
          numberOfShares: 0,
        },
        {
          name: "ARKK",
          percentage: 25,
          investmentAmount: 0,
          stockPrice: 0,
          numberOfShares: 0,
        },
        {
          name: "TSLA",
          percentage: 15,
          investmentAmount: 0,
          stockPrice: 0,
          numberOfShares: 0,
        },
        {
          name: "SPYD",
          percentage: 10,
          investmentAmount: 0,
          stockPrice: 0,
          numberOfShares: 0,
        },
        {
          name: "ETH",
          percentage: 10,
          investmentAmount: 0,
          stockPrice: 0,
          numberOfShares: 0,
        },
      ],
      userInput: "",
      stock1: "",
      stock2: "",
      stock3: "",
      stock4: "",
      stock5: "",
    };
  }

  calculateHandler = async (e) => {
    e.preventDefault();

    await this.getStockPrices();

    this.setState({
      stocks: [
        {
          name: "SPY",
          percentage: 40,
          investmentAmount: this.state.userInput * 0.4,
          stockPrice: this.state.stock1,
          numberOfShares: (this.state.userInput * 0.4) / this.state.stock1,
        },
        {
          name: "ARKK",
          percentage: 25,
          investmentAmount: this.state.userInput * 0.25,
          stockPrice: this.state.stock2,
          numberOfShares: (this.state.userInput * 0.25) / this.state.stock2,
        },
        {
          name: "TSLA",
          percentage: 15,
          investmentAmount: this.state.userInput * 0.15,
          stockPrice: this.state.stock3,
          numberOfShares: (this.state.userInput * 0.15) / this.state.stock3,
        },
        {
          name: "SPYD",
          percentage: 10,
          investmentAmount: this.state.userInput * 0.1,
          stockPrice: this.state.stock4,
          numberOfShares: (this.state.userInput * 0.1) / this.state.stock4,
        },
        {
          name: "ETH",
          percentage: 10,
          investmentAmount: this.state.userInput * 0.1,
          stockPrice: this.state.stock5,
          numberOfShares: (this.state.userInput * 0.1) / this.state.stock5,
        },
      ],
    });
  };

  getStockPrices = async (e) => {
    await this.getStockValue("SPY").then((data) =>
      this.setState({
        stock1: data,
      })
    );
    await this.getStockValue("ARKK").then((data) =>
      this.setState({
        stock2: data,
      })
    );
    await this.getStockValue("TSLA").then((data) =>
      this.setState({
        stock3: data,
      })
    );
    await this.getStockValue("SPYD").then((data) =>
      this.setState({
        stock4: data,
      })
    );
    await this.getStockValue("ETH").then((data) =>
      this.setState({
        stock5: data,
      })
    );
  };

  getStockValue = async (ticker) => {
    const value = await axios
      .get(
        `https://api.polygon.io/v2/aggs/ticker/${ticker}/prev?adjusted=true&apiKey=${API_KEY}`
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
                <th className="table-heading">Investment Amount</th>
                <th className="table-heading">Stock Price</th>
                <th className="table-heading"># of Shares</th>
              </tr>
            </tbody>
            {this.state.stocks.map((stock, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <td className="table-item">{stock.name}</td>
                    <td className="table-item">{stock.percentage}%</td>
                    <td className="table-item">
                      {"$" + stock.investmentAmount.toFixed(2)}
                    </td>
                    <td className="table-item">{"$" + stock.stockPrice}</td>
                    <td className="table-item">
                      {stock.numberOfShares.toFixed(3)}
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
              value={this.state.userInput}
              onChange={(e) => this.setState({ userInput: e.target.value })}
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
