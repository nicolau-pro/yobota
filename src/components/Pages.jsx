import React, { Component } from "react";

class Pages extends Component {
  elements = {
    row: {
      class: "row pageNavigation"
    },
    prev: {
      class: "btn btn-light"
    },
    buttons: {
      first: {
        class: "",
        classDefault: "btn btn-secondary",
        content: 0,
        contentDefault: 1
      },
      left: {
        class: "",
        classDefault: "btn btn-secondary",
        content: 0,
        contentDefault: 2
      },
      middle: {
        class: "",
        classDefault: "btn btn-secondary",
        content: 0,
        contentDefault: 3
      },
      right: {
        class: "",
        classDefault: "btn btn-secondary",
        content: 0,
        contentDefault: 4
      },
      last: {
        class: "",
        classDefault: "btn btn-secondary",
        content: 0,
        contentDefault: 5
      }
    },
    dots: {
      left: { class: "" },
      right: { class: "" }
    },
    next: {
      class: "btn btn-light"
    }
  };

  componentDidUpdate() {
    //console.log("PAGES componentDidUpdate");
  }

  hide(element) {
    if (!element.class.includes("d-none")) element.class += " d-none";
  }

  show(element) {
    element.class = element.class.replace(" d-none", "");
  }

  disable(element) {
    if (!element.class.includes("disabled")) element.class += " disabled";
  }

  enable(element) {
    element.class = element.class.replace(" disabled", "");
  }

  setPages() {
    const { total, current } = this.props.pages;
    var elements = this.elements;

    // Reset elements:
    this.show(elements.row);
    this.hide(elements.dots.left);
    this.hide(elements.dots.right);
    this.enable(elements.prev);
    this.enable(elements.prev);
    for (var b in elements.buttons) {
      if (elements.buttons.hasOwnProperty(b)) {
        var button = elements.buttons[b];
        button.class = button.classDefault;
        button.content = button.contentDefault;
      }
    }

    // There is only one page or no results:
    if (total <= 1) {
      this.hide(elements.row);
    }

    // There are 5 pages or less:
    else if (total <= 5) {
      for (b in elements.buttons) {
        if (elements.buttons.hasOwnProperty(b)) {
          button = elements.buttons[b];
          if (button.content > total) {
            this.hide(button);
          }
        }
      }
    }

    // There are 6 or more pages:
    else {
      if (current > 3) {
        this.show(elements.dots.left);
      }
      if (current <= total - 3) {
        this.show(elements.dots.right);
      }

      elements.buttons.left.content = current - 1;
      elements.buttons.middle.content = current;
      elements.buttons.right.content = current + 1;

      if (current <= 2) {
        elements.buttons.left.content = 2;
        elements.buttons.middle.content = 3;
        elements.buttons.right.content = 4;
      } else if (current >= total - 1) {
        elements.buttons.left.content = total - 3;
        elements.buttons.middle.content = total - 2;
        elements.buttons.right.content = total - 1;
      }

      elements.buttons.last.content = total;
    }

    // Hide prev arrow if the first page is the current page
    if (current === 1) {
      this.disable(elements.prev);
    }

    // Hide next arrow if the first page is the current page
    if (current === total) {
      this.disable(elements.next);
    }

    // Highlight current page:
    for (b in elements.buttons) {
      if (elements.buttons.hasOwnProperty(b)) {
        button = elements.buttons[b];
        if (button.content === current) {
          button.class = "btn btn-danger";
        }
      }
    }
  }

  render() {
    this.setPages();
    var elements = this.elements;

    return (
      <section className={elements.row.class}>
        <div>
          <button
            type="button"
            className="btn btn-light mobileOnly"
            onClick={() => this.props.NavigateToPage(1)}
          >
            <i className="im im-previous"></i>
          </button>

          <button
            type="button"
            className={elements.prev.class}
            onClick={() => this.props.NavigateToPrevPage()}
          >
            <i className="im im-angle-left"></i>
          </button>

          <button
            type="button"
            className={elements.buttons.first.class}
            onClick={() =>
              this.props.NavigateToPage(elements.buttons.first.content)
            }
          >
            {elements.buttons.first.content}
          </button>

          <span className={elements.dots.left.class}>• • •</span>

          <button
            type="button"
            className={elements.buttons.left.class}
            onClick={() =>
              this.props.NavigateToPage(elements.buttons.left.content)
            }
          >
            {elements.buttons.left.content}
          </button>

          <button
            type="button"
            className={elements.buttons.middle.class}
            onClick={() =>
              this.props.NavigateToPage(elements.buttons.middle.content)
            }
          >
            {elements.buttons.middle.content}
          </button>

          <button
            type="button"
            className={elements.buttons.right.class}
            onClick={() =>
              this.props.NavigateToPage(elements.buttons.right.content)
            }
          >
            {elements.buttons.right.content}
          </button>

          <span className={elements.dots.right.class}>• • •</span>

          <button
            type="button"
            className={elements.buttons.last.class}
            onClick={() =>
              this.props.NavigateToPage(elements.buttons.last.content)
            }
          >
            {elements.buttons.last.content}
          </button>

          <button
            type="button"
            className={elements.next.class}
            onClick={() => this.props.NavigateToNextPage()}
          >
            <i className="im im-angle-right"></i>
          </button>

          <button
            type="button"
            className="btn btn-light mobileOnly"
            onClick={() =>
              this.props.NavigateToPage(elements.buttons.last.content)
            }
          >
            <i className="im im-next"></i>
          </button>
        </div>
      </section>
    );
  }
}

export default Pages;
