import React, { useState, useEffect } from "react";
import "./ConferenceEvent.css";
import TotalCost from "./TotalCost";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "./venueSlice";
import { incrementAvQuantity, decrementAvQuantity } from "./avSlice";
import { toggleMealSelection } from "./mealsSlice";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ConferenceEvent = () => {
  const [showItems, setShowItems] = useState(false);
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const venueItems = useSelector((state) => state.venue);
  const avItems = useSelector((state) => state.av);
  const mealsItems = useSelector((state) => state.meals);

  const dispatch = useDispatch();

  const remainingAuditoriumQuantity =
    3 -
    venueItems.find((item) => item.name === "Auditorium Hall (Capacity:200)")
      .quantity;

  const handleAddToCart = (index) => {
    if (
      venueItems[index].name === "Auditorium Hall (Capacity:200)" &&
      venueItems[index].quantity >= 3
    )
      return;
    dispatch(incrementQuantity(index));
  };

  const handleRemoveFromCart = (index) => {
    if (venueItems[index].quantity > 0) dispatch(decrementQuantity(index));
  };

  const handleIncrementAvQuantity = (index) => dispatch(incrementAvQuantity(index));
  const handleDecrementAvQuantity = (index) => dispatch(decrementAvQuantity(index));

  const handleMealSelection = (index) => {
    const item = mealsItems[index];
    if (item.selected && item.type === "mealForPeople") {
      const newNumberOfPeople = item.selected ? numberOfPeople : 0;
      dispatch(toggleMealSelection(index, newNumberOfPeople));
    } else {
      dispatch(toggleMealSelection(index));
    }
  };

  const getItemsFromTotalCost = () => {
    const items = [];
    venueItems.forEach((item) => item.quantity > 0 && items.push({ ...item, type: "venue" }));
    avItems.forEach(
      (item) => item.quantity > 0 && !items.some((i) => i.name === item.name && i.type === "av") && items.push({ ...item, type: "av" })
    );
    mealsItems.forEach((item) => {
      if (item.selected) {
        const itemForDisplay = { ...item, type: "meals" };
        if (item.numberOfPeople) itemForDisplay.numberOfPeople = numberOfPeople;
        items.push(itemForDisplay);
      }
    });
    return items;
  };

  const items = getItemsFromTotalCost();

  const calculateTotalCost = (section) => {
    let total = 0;
    if (section === "venue") venueItems.forEach((i) => (total += i.cost * i.quantity));
    else if (section === "av") avItems.forEach((i) => (total += i.cost * i.quantity));
    else if (section === "meals")
      mealsItems.forEach((i) => i.selected && (total += i.cost * numberOfPeople));
    return total;
  };

  const venueTotalCost = calculateTotalCost("venue");
  const avTotalCost = calculateTotalCost("av");
  const mealsTotalCost = calculateTotalCost("meals");

  const totalCosts = { venue: venueTotalCost, av: avTotalCost, meals: mealsTotalCost };

  // Smooth scroll when clicking navbar
  const navigateToProducts = (idType) => {
    const section = document.querySelector(idType);
    if (section) section.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // Parallax-style horizontal shift
  useEffect(() => {
    const handleScroll = () => {
      const containers = document.querySelectorAll(".venue_container");
      containers.forEach((c) => {
        const rect = c.getBoundingClientRect();
        const offset = rect.left - window.innerWidth / 2 + rect.width / 2;
        c.style.transform = `translateX(${-offset * 0.05}px)`;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Drag-to-scroll
  useEffect(() => {
    const slider = document.querySelector(".scroll_container");
    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    const mouseDown = (e) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const mouseLeave = () => {
      isDown = false;
      slider.classList.remove("active");
    };

    const mouseUp = () => {
      isDown = false;
      slider.classList.remove("active");
    };

    const mouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener("mousedown", mouseDown);
    slider.addEventListener("mouseleave", mouseLeave);
    slider.addEventListener("mouseup", mouseUp);
    slider.addEventListener("mousemove", mouseMove);

    // Touch support
    slider.addEventListener("touchstart", (e) => mouseDown(e.touches[0]));
    slider.addEventListener("touchend", mouseUp);
    slider.addEventListener("touchmove", (e) => mouseMove(e.touches[0]));

    return () => {
      slider.removeEventListener("mousedown", mouseDown);
      slider.removeEventListener("mouseleave", mouseLeave);
      slider.removeEventListener("mouseup", mouseUp);
      slider.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const ItemsDisplay = ({ items }) => (
    <div className="display_box1">
      {items.length === 0 && <p>No items selected</p>}
      <table className="table_item_data">
        <thead>
          <tr>
            <th>Name</th>
            <th>Unit Cost</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}>
              <td>{item.name}</td>
              <td>${item.cost}</td>
              <td>
                {item.type === "meals" || item.numberOfPeople
                  ? ` For ${numberOfPeople} people`
                  : item.quantity}
              </td>
              <td>
                {item.type === "meals" || item.numberOfPeople
                  ? `${item.cost * numberOfPeople}`
                  : `${item.cost * item.quantity}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      <Navbar navigateToProducts={navigateToProducts} />

      <div className="main_container">
        {!showItems ? (
          <>
            <div className="scroll_container">
              {/* Venue */}
              <div id="venue" className="venue_container container_main">
                <h1>Venue Room Selection</h1>
                <div className="venue_selection">
                  {venueItems.map((item, index) => (
                    <div className="venue_main" key={index}>
                      <div className="img">
                        <img src={item.img} alt={item.name} />
                      </div>
                      <div className="text">{item.name}</div>
                      <div>${item.cost}</div>
                      <div className="button_container">
                        <button
                          className={venueItems[index].quantity === 0 ? "btn-warning btn-disabled" : "btn-warning btn-plus"}
                          onClick={() => handleRemoveFromCart(index)}
                        >
                          &ndash;
                        </button>
                        <span className="selected_count">{venueItems[index].quantity}</span>
                        <button
                          className={
                            venueItems[index].name === "Auditorium Hall (Capacity:200)" &&
                            remainingAuditoriumQuantity === 0
                              ? "btn-success btn-disabled"
                              : "btn-success btn-plus"
                          }
                          onClick={() => handleAddToCart(index)}
                        >
                          &#43;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="total_cost">Total Cost: ${venueTotalCost}</div>
              </div>

              {/* Add-ons */}
              <div id="addons" className="venue_container container_main">
                <h1>Add-ons Selection</h1>
                <div className="addons_selection">
                  {avItems.map((item, index) => (
                    <div className="av_data venue_main" key={index}>
                      <div className="img">
                        <img src={item.img} alt={item.name} />
                      </div>
                      <div className="text">{item.name}</div>
                      <div>${item.cost}</div>
                      <div className="addons_btn">
                        <button className="btn-warning" onClick={() => handleDecrementAvQuantity(index)}>
                          &ndash;
                        </button>
                        <span className="quantity-value">{item.quantity}</span>
                        <button className="btn-success" onClick={() => handleIncrementAvQuantity(index)}>
                          &#43;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="total_cost">Total Cost: ${avTotalCost}</div>
              </div>

              {/* Meals */}
              <div id="meals" className="venue_container container_main">
                <h1>Meals Selection</h1>
                <label htmlFor="numberOfPeople">
                  <h3>Number of People:</h3>
                </label>
                <input
                  type="number"
                  className="input_box5"
                  id="numberOfPeople"
                  value={numberOfPeople}
                  onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
                  min="1"
                />
                <div className="meal_selection">
                  {mealsItems.map((item, index) => (
                    <div className="meal_item" key={index} style={{ padding: 15 }}>
                      <div className="inner">
                        <input
                          type="checkbox"
                          id={`meal_${index}`}
                          checked={item.selected}
                          onChange={() => handleMealSelection(index)}
                        />
                        <label htmlFor={`meal_${index}`}>{item.name}</label>
                      </div>
                      <div className="meal_cost">${item.cost}</div>
                    </div>
                  ))}
                </div>
                <div className="total_cost">Total Cost: ${mealsTotalCost}</div>
              </div>
            </div>

            {/* Centered Show Details button */}
            <div className="details_button_container">
              <button className="details_button" onClick={() => setShowItems(!showItems)}>
                Show Details
              </button>
            </div>
          </>
        ) : (
          <div className="total_amount_detail">
            <TotalCost
              totalCosts={totalCosts}
              handleClick={() => setShowItems(!showItems)}
              ItemsDisplay={() => <ItemsDisplay items={items} />}
            />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ConferenceEvent;
