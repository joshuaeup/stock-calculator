import "./styles/App.css";

import { Component } from "react";
import stocks from "./data/stocks";
import getStockValue from "./utilities/polygon";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: stocks,
      userInput: "",
      stock1: "",
      stock2: "",
      stock3: "",
      stock4: "",
      stock5: "",
    };
  }

  componentDidMount() {
    this.getStockPrices();
  }

  calculateHandler = async (e) => {
    e.preventDefault();

    await this.setCalculations();
  };

  setCalculations = async (e) => {
    await this.setState({
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
    await getStockValue("SPY").then((data) =>
      this.setState({
        stock1: data,
      })
    );
    await getStockValue("ARKK").then((data) =>
      this.setState({
        stock2: data,
      })
    );
    await getStockValue("TSLA").then((data) =>
      this.setState({
        stock3: data,
      })
    );
    await getStockValue("SPYD").then((data) =>
      this.setState({
        stock4: data,
      })
    );
    await getStockValue("ETH").then((data) =>
      this.setState({
        stock5: data,
      })
    );
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 id="title">Stock Calculator</h1>
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
