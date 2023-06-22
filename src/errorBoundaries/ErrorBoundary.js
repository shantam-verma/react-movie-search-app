import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Fetching", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Error: {this.state.error.message}</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
