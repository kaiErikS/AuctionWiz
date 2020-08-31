import React from "react";
import { shallow } from "enzyme";

import Home from "../../src/client/pages/Home";
import Login from "../../src/client/pages/Login";
import MyAuctions from "../../src/client/pages/MyAuctions";
import NewAuction from "../../src/client/pages/NewAuction";
import Register from "../../src/client/pages/Register";
import AuctionItem from "../../src/client/components/AuctionItem";
import Header from "../../src/client/components/Header";
import App from "../../src/client/App";

describe("<Login />", () => {
  it("Renders correct container", () => {
    const component = shallow(<Login />);
    const wrapper = component.find(".login-container");
    expect(wrapper.length).toBe(1);
  });
});

describe("<App />", () => {
  it("Gets items", () => {
    const component = shallow(<App />);
    expect(component.state("isLogged")).toBe("NOT_LOGGED");
  });
});

describe("<Home />", () => {
  it("Renders prop corrrectly", () => {
    const prop = "Tim";
    const component = shallow(<Home userId={prop} />);
    const wrapper = component.find("#title");
    expect(wrapper.text()).toBe("Welcome, Tim");
  });
  it("Renders prop corrrectly", () => {
    const prop = "Tim";
    const component = shallow(<Home />);
    const wrapper = component.find(".home-container");
    expect(wrapper.length).toBe(1);
  });
  it("Gets items", () => {
    const component = shallow(<Home />);
    const instance = component.instance();
    instance.componentDidMount();
    expect(component.state("loading")).toBe(true);
  });
});

describe("<MyAuctions />", () => {
  it("Processes prop correct", () => {
    const prop = "Tim";
    const component = shallow(<MyAuctions userId={prop} />);
    const wrapper = component.find("#title");
    expect(wrapper.text()).toBe("Welcome, Tim");
  });
});

describe("<NewAuction />", () => {
  it("State is bound correctly", () => {
    const component = shallow(<NewAuction />);
    const firstWrapper = component.find(".errorMsg");
    const secondWrapper = component.find(".sold");
    expect(firstWrapper.text()).toBe("");
    expect(secondWrapper.text()).toBe("");
  });
});

describe("<Register />", () => {
  it("State is bound correctly", () => {
    const component = shallow(<Register />);
    const firstWrapper = component.find(".errorMsg");
    expect(firstWrapper.text()).toBe("");
  });
});

describe("<AuctionItem />", () => {
  it("Processes prop correct", () => {
    const item = "table";
    const description = "long";
    const sPrice = 2000;
    const cBid = 2500;
    const buyout = 3000;
    const seller = "jimmy";
    const component = shallow(
      <AuctionItem
        item={item}
        description={description}
        startingPrice={sPrice}
        currentBid={cBid}
        buyout={buyout}
        seller={seller}
      />
    );

    const firstWrapper = component.find("#item");
    const secondWrapper = component.find("#description");
    const thirdWrapper = component.find("#s-price");
    const fiftWrapper = component.find("#buyout");
    const sixtWrapper = component.find("#seller");

    expect(firstWrapper.text()).toBe("table");
    expect(secondWrapper.text()).toBe("long");
    expect(thirdWrapper.text()).toBe("STARTING PRICE: 2000 NOK");
    expect(fiftWrapper.text()).toBe("BUYOUT: 3000 NOK");
    expect(sixtWrapper.text()).toBe("Seller: jimmy");
  });
  it("Componentdidmount properly", () => {
    const prop = true;
    const component = shallow(<AuctionItem isSold={prop} />);
    const instance = component.instance();
    instance.componentDidMount();
    expect(component.state("isSold")).toBe(true);
  });
});

describe("<Header />", () => {
  it("Processes prop correct", () => {
    const prop = "jimmy";
    const component = shallow(<Header userId={prop} />);
    const firstWrapper = component.find(".greeting");
    expect(firstWrapper.text()).toBe("Welcome, jimmy");
  });
  it("Sets user from props", () => {
    const prop = "jimmy";
    const component = shallow(<Header userId={prop} />);
    const instance = component.instance();
    instance.componentDidMount();
    expect(component.state("userName")).toBe("jimmy");
  });
});
