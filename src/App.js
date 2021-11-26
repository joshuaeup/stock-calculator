import "./styles/App.css";

import { Component } from "react";
import { short_term_stocks, long_term_stocks } from "./data/stocks";
import getStockValue from "./utilities/polygon";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectShortTerm: true,
      stocks: [],
      userInput: "",
    };
  }

  componentDidMount() {
    this.setState({
      stocks: this.state.selectShortTerm ? short_term_stocks : long_term_stocks,
    });
  }

  calculateHandler = async (e) => {
    e.preventDefault();

    await this.getStockPrices();
    await this.setCalculations();
  };

  setCalculations = async (e) => {
    const updatedStocks = [];

    for (let i = 0; i < this.state.stocks.length; i++) {
      const percentageAsDecimal = this.state.stocks[i].percentage / 100;
      updatedStocks.push({
        name: this.state.stocks[i].name,
        percentage: this.state.stocks[i].percentage,
        investmentAmount: this.state.userInput * percentageAsDecimal,
        stockPrice: this.state[`stock${i + 1}`],
        numberOfShares:
          (this.state.userInput * percentageAsDecimal) /
          this.state[`stock${i + 1}`],
      });
    }

    await this.setState({
      stocks: updatedStocks,
    });
  };

  getStockPrices = async (e) => {
    for (let i = 0; i < this.state.stocks.length; i++) {
      await getStockValue(this.state.stocks[i].name).then((data) => {
        return this.setState({
          [`stock${i + 1}`]: data,
        });
      });
    }
  };

  updateStockType = (e) => {
    e.preventDefault();

    const result = e.target.value === "shortTerm" ? true : false;

    this.setState({
      stocks: result ? short_term_stocks : long_term_stocks,
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 id="title">Stocky</h1>
          <div id="toggle-btn__container">
            <button
              className="toggle-btn"
              value="shortTerm"
              onClick={this.updateStockType}
            >
              Short Term
            </button>
            <button
              className="toggle-btn"
              value="longTerm"
              onClick={this.updateStockType}
            >
              Long Term
            </button>
          </div>
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
