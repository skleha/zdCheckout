

class SupportPlan {

  constructor(id, name, seats, cost) {
    this.id = id;
    this.name = name;
    this.seats = seats;
    this.cost = cost;
  }

  setId(id) {
    this.id = id;
  }

  setName(name) {
    this.name = name;
  }

  setSeats(seats) {
    this.seats = seats;
  }

  setCost(cost) {
    this.cost = cost;
  }
}

export default SupportPlan;
