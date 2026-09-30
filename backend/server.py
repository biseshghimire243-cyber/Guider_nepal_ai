from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# ==========================================
# HOME / HEALTH CHECK
# ==========================================

@app.route("/")
def home():
    return jsonify({
        "success": True,
        "message": "Himalaya Explorer API is running",
        "project": "Guider Nepal AI"
    })


@app.route("/api/health")
def health():
    return jsonify({
        "success": True,
        "status": "Backend is working"
    })


# ==========================================
# DESTINATIONS
# ==========================================

destinations = [
    {
        "id": 1,
        "name": "Mount Everest",
        "country": "Nepal",
        "region": "Himalaya",
        "category": "Adventure",
        "location": "Solukhumbu",
        "difficulty": "Extreme",
        "type": "Mountain",
        "featured": True,
        "description": "Mount Everest is the highest mountain in the world and one of Nepal's most iconic destinations."
    },
    {
        "id": 2,
        "name": "Pokhara",
        "country": "Nepal",
        "region": "Himalaya",
        "category": "Nature",
        "location": "Gandaki",
        "difficulty": "Easy",
        "type": "City & Nature",
        "featured": False,
        "description": "Pokhara is famous for its lakes, mountain views, adventure activities and peaceful surroundings."
    },
    {
        "id": 3,
        "name": "Annapurna",
        "country": "Nepal",
        "region": "Himalaya",
        "category": "Adventure",
        "location": "Gandaki",
        "difficulty": "Hard",
        "type": "Trekking",
        "featured": False,
        "description": "The Annapurna region offers some of the most popular trekking routes in the Himalayas."
    },
    {
        "id": 4,
        "name": "Upper Mustang",
        "country": "Nepal",
        "region": "Himalaya",
        "category": "Adventure",
        "location": "Mustang",
        "difficulty": "Moderate",
        "type": "Culture & Trekking",
        "featured": False,
        "description": "Upper Mustang is known for its unique landscapes, ancient caves, monasteries and Tibetan culture."
    },
    {
        "id": 5,
        "name": "Kathmandu Valley",
        "country": "Nepal",
        "region": "Nepal",
        "category": "Culture",
        "location": "Kathmandu",
        "difficulty": "Easy",
        "type": "Culture",
        "featured": False,
        "description": "Kathmandu Valley is home to historic temples, cultural landmarks and UNESCO World Heritage sites."
    },
    {
        "id": 6,
        "name": "Chitwan",
        "country": "Nepal",
        "region": "Nepal",
        "category": "Adventure",
        "location": "Chitwan",
        "difficulty": "Easy",
        "type": "Wildlife",
        "featured": False,
        "description": "Chitwan is famous for jungle safaris, wildlife and the Chitwan National Park."
    },
    {
        "id": 7,
        "name": "Bhutan Himalayas",
        "country": "Bhutan",
        "region": "Himalaya",
        "category": "Adventure",
        "location": "Bhutan",
        "difficulty": "Moderate",
        "type": "Mountain",
        "featured": False,
        "description": "The Bhutan Himalayas combine spectacular mountain landscapes with rich culture and monasteries."
    },
    {
        "id": 8,
        "name": "Swiss Alps",
        "country": "Switzerland",
        "region": "Europe",
        "category": "Adventure",
        "location": "Switzerland",
        "difficulty": "Moderate",
        "type": "Mountain",
        "featured": False,
        "description": "The Swiss Alps offer spectacular mountains, hiking routes, villages and winter activities."
    },
    {
        "id": 9,
        "name": "Kyoto",
        "country": "Japan",
        "region": "Asia",
        "category": "Culture",
        "location": "Japan",
        "difficulty": "Easy",
        "type": "Culture",
        "featured": False,
        "description": "Kyoto is famous for traditional temples, gardens, historic streets and Japanese culture."
    }
]


# ==========================================
# GET ALL DESTINATIONS
# ==========================================

@app.route("/api/destinations", methods=["GET"])
def get_destinations():

    search = request.args.get("search", "").lower()
    category = request.args.get("category", "").lower()
    country = request.args.get("country", "").lower()
    region = request.args.get("region", "").lower()

    results = destinations

    if search:
        results = [
            destination
            for destination in results
            if search in destination["name"].lower()
            or search in destination["country"].lower()
            or search in destination["location"].lower()
            or search in destination["category"].lower()
        ]

    if category and category != "all":
        results = [
            destination
            for destination in results
            if category == destination["category"].lower()
        ]

    if country and country != "all":
        results = [
            destination
            for destination in results
            if country == destination["country"].lower()
        ]

    if region and region != "all":
        results = [
            destination
            for destination in results
            if region == destination["region"].lower()
        ]

    return jsonify({
        "success": True,
        "count": len(results),
        "destinations": results
    })


# ==========================================
# GET SINGLE DESTINATION
# ==========================================

@app.route("/api/destinations/<int:destination_id>", methods=["GET"])
def get_destination(destination_id):

    destination = next(
        (
            item
            for item in destinations
            if item["id"] == destination_id
        ),
        None
    )

    if destination is None:
        return jsonify({
            "success": False,
            "message": "Destination not found"
        }), 404

    return jsonify({
        "success": True,
        "destination": destination
    })


# ==========================================
# FEATURED DESTINATIONS
# ==========================================

@app.route("/api/destinations/featured", methods=["GET"])
def featured_destinations():

    featured = [
        destination
        for destination in destinations
        if destination["featured"]
    ]

    return jsonify({
        "success": True,
        "count": len(featured),
        "destinations": featured
    })


# ==========================================
# COUNTRIES
# ==========================================

@app.route("/api/countries", methods=["GET"])
def get_countries():

    countries = sorted(
        list(
            set(
                destination["country"]
                for destination in destinations
            )
        )
    )

    return jsonify({
        "success": True,
        "count": len(countries),
        "countries": countries
    })


# ==========================================
# SEARCH
# ==========================================

@app.route("/api/search", methods=["GET"])
def search_destinations():

    query = request.args.get("q", "").lower().strip()

    if not query:
        return jsonify({
            "success": True,
            "count": 0,
            "results": []
        })

    results = [
        destination
        for destination in destinations
        if query in destination["name"].lower()
        or query in destination["country"].lower()
        or query in destination["region"].lower()
        or query in destination["category"].lower()
        or query in destination["location"].lower()
        or query in destination["type"].lower()
    ]

    return jsonify({
        "success": True,
        "count": len(results),
        "results": results
    })


# ==========================================
# ERROR HANDLERS
# ==========================================

@app.errorhandler(404)
def not_found(error):

    return jsonify({
        "success": False,
        "message": "API endpoint not found"
    }), 404


@app.errorhandler(500)
def server_error(error):

    return jsonify({
        "success": False,
        "message": "Internal server error"
    }), 500


# ==========================================
# RUN SERVER
# ==========================================

if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )