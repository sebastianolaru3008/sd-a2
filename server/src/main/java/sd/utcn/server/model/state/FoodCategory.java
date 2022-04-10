package sd.utcn.server.model.state;

public enum FoodCategory {
    Breakfast{
        @Override
        public String toString() {
            return "Breakfast";
        }
    },
    Lunch{
        @Override
        public String toString() {
            return "Lunch";
        }
    },
    Dessert{
        @Override
        public String toString() {
            return "Dessert";
        }
    },
    Beverages{
        @Override
        public String toString() {
            return "Beverages";
        }
    }
}
