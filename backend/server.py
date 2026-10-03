from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import mysql.connector
import os


app = Flask(__name__)
CORS(app)


# ============================================================
# FRONTEND
# ============================================================

FRONTEND_FOLDER = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "frontend")
)


# ============================================================
# DATABASE
# ============================================================

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="himalaya_explorer"
    )


# ============================================================
# FRONTEND ROUTES
# ============================================================

@app.route("/")
def home():
    return send_from_directory(FRONTEND_FOLDER, "index.html")


@app.route("/<path:filename>")
def frontend_files(filename):
    file_path = os.path.join(FRONTEND_FOLDER, filename)

    if os.path.isfile(file_path):
        return send_from_directory(FRONTEND_FOLDER, filename)

    return jsonify({
        "success": False,
        "message": "Frontend file not found"
    }), 404


# ============================================================
# HEALTH CHECK
# ============================================================

@app.route("/api/health")
def health():
    return jsonify({
        "success": True,
        "status": "Backend is working",
        "project": "Guider Nepal AI"
    })


# ============================================================
# DESTINATIONS
# ============================================================

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
        "description": "Explore the world's highest mountain and experience the legendary Everest region."
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
        "featured": True,
        "description": "Discover lakes, mountains, adventure activities and beautiful Himalayan views."
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
        "featured": True,
        "description": "Experience one of the most spectacular trekking regions in the Himalayas."
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
        "description": "Explore the mysterious landscapes, ancient caves and Tibetan culture of Mustang."
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
        "featured": True,
        "description": "Discover temples, heritage sites, traditional architecture and vibrant city life."
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
        "description": "Experience jungle safaris, wildlife and the natural beauty of southern Nepal."
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
        "description": "Explore peaceful Himalayan landscapes and traditional Bhutanese culture."
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
        "description": "Experience dramatic peaks, alpine villages and unforgettable mountain scenery."
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
        "description": "Discover Japanese temples, gardens, traditions and historic streets."
    }
]


@app.route("/api/destinations", methods=["GET"])
def get_destinations():

    search = request.args.get("search", "").lower()
    category = request.args.get("category", "").lower()
    country = request.args.get("country", "").lower()
    region = request.args.get("region", "").lower()

    filtered = destinations

    if search:
        filtered = [
            destination for destination in filtered
            if search in destination["name"].lower()
            or search in destination["description"].lower()
            or search in destination["location"].lower()
        ]

    if category:
        filtered = [
            destination for destination in filtered
            if destination["category"].lower() == category
        ]

    if country:
        filtered = [
            destination for destination in filtered
            if destination["country"].lower() == country
        ]

    if region:
        filtered = [
            destination for destination in filtered
            if destination["region"].lower() == region
        ]

    return jsonify({
        "success": True,
        "count": len(filtered),
        "destinations": filtered
    })


@app.route("/api/destinations/<int:destination_id>", methods=["GET"])
def get_destination(destination_id):

    destination = next(
        (
            destination
            for destination in destinations
            if destination["id"] == destination_id
        ),
        None
    )

    if not destination:
        return jsonify({
            "success": False,
            "message": "Destination not found"
        }), 404

    return jsonify({
        "success": True,
        "destination": destination
    })


@app.route("/api/destinations/featured", methods=["GET"])
def get_featured_destinations():

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


# ============================================================
# COUNTRIES
# ============================================================

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


# ============================================================
# SEARCH
# ============================================================

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
        or query in destination["category"].lower()
        or query in destination["location"].lower()
        or query in destination["description"].lower()
    ]

    return jsonify({
        "success": True,
        "count": len(results),
        "results": results
    })


# ============================================================
# REGISTER
# ============================================================

@app.route("/api/register", methods=["POST"])
def register():

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "No registration data received"
        }), 400

    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not name:
        return jsonify({
            "success": False,
            "message": "Name is required"
        }), 400

    if not email:
        return jsonify({
            "success": False,
            "message": "Email is required"
        }), 400

    if not password:
        return jsonify({
            "success": False,
            "message": "Password is required"
        }), 400

    if len(password) < 6:
        return jsonify({
            "success": False,
            "message": "Password must be at least 6 characters"
        }), 400

    connection = None
    cursor = None

    try:

        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute(
            "SELECT id FROM users WHERE email = %s",
            (email,)
        )

        existing_user = cursor.fetchone()

        if existing_user:
            return jsonify({
                "success": False,
                "message": "An account with this email already exists"
            }), 409

        hashed_password = generate_password_hash(password)

        cursor.execute(
            """
            INSERT INTO users (name, email, password)
            VALUES (%s, %s, %s)
            """,
            (name, email, hashed_password)
        )

        connection.commit()

        return jsonify({
            "success": True,
            "message": "Registration successful"
        }), 201

    except mysql.connector.Error as error:

        return jsonify({
            "success": False,
            "message": "Database error",
            "error": str(error)
        }), 500

    finally:

        if cursor:
            cursor.close()

        if connection:
            connection.close()


# ============================================================
# LOGIN
# ============================================================

@app.route("/api/login", methods=["POST"])
def login():

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "No login data received"
        }), 400

    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not email or not password:
        return jsonify({
            "success": False,
            "message": "Email and password are required"
        }), 400

    connection = None
    cursor = None

    try:

        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute(
            """
            SELECT id, name, email, password
            FROM users
            WHERE email = %s
            """,
            (email,)
        )

        user = cursor.fetchone()

        if not user:
            return jsonify({
                "success": False,
                "message": "Invalid email or password"
            }), 401

        password_is_valid = check_password_hash(
            user["password"],
            password
        )

        if not password_is_valid:
            return jsonify({
                "success": False,
                "message": "Invalid email or password"
            }), 401

        return jsonify({
            "success": True,
            "message": "Login successful",
            "user": {
                "id": user["id"],
                "name": user["name"],
                "email": user["email"]
            }
        })

    except mysql.connector.Error as error:

        return jsonify({
            "success": False,
            "message": "Database error",
            "error": str(error)
        }), 500

    finally:

        if cursor:
            cursor.close()

        if connection:
            connection.close()


            # ============================================================
# AI TRAVEL GUIDE
# ============================================================

@app.route("/api/ai-guide", methods=["POST"])
def ai_guide():

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "No message received"
        }), 400

    message = data.get("message", "").strip()

    if not message:
        return jsonify({
            "success": False,
            "message": "Please enter a travel question"
        }), 400

    text = message.lower()

    # --------------------------------------------------------
    # DESTINATION QUESTIONS
    # --------------------------------------------------------

    if "everest" in text:

        reply = (
            "Mount Everest is located in the Solukhumbu region of Nepal. "
            "The Everest Base Camp Trek is one of Nepal's most famous "
            "trekking experiences. It normally takes around two weeks "
            "and reaches an altitude of about 5,364 meters at Base Camp."
        )

    elif "pokhara" in text:

        reply = (
            "Pokhara is one of Nepal's most popular destinations. "
            "You can enjoy Phewa Lake, mountain views, boating, "
            "paragliding, hiking, caves and nearby viewpoints such as "
            "Sarangkot."
        )

    elif "annapurna" in text:

        reply = (
            "The Annapurna region offers several trekking experiences, "
            "including the Annapurna Circuit and routes around the "
            "Annapurna mountain range. The region is known for dramatic "
            "mountain scenery, villages and diverse landscapes."
        )

    elif "mustang" in text:

        reply = (
            "Upper Mustang is famous for its dry Himalayan landscape, "
            "ancient settlements, caves and Tibetan-influenced culture. "
            "It is a distinctive destination in northern Nepal."
        )

    elif "chitwan" in text:

        reply = (
            "Chitwan is known for wildlife and jungle experiences. "
            "Visitors can explore Chitwan National Park and experience "
            "wildlife-focused activities and local culture."
        )

    # --------------------------------------------------------
    # TREKKING
    # --------------------------------------------------------

    elif "trek" in text or "trekking" in text:

        reply = (
            "Nepal has trekking routes for different experience levels. "
            "Popular options include Everest Base Camp, Annapurna, "
            "Langtang, Mardi Himal, Ghorepani Poon Hill and Upper Mustang. "
            "Your choice should depend on fitness, available time, altitude "
            "and trekking experience."
        )

    # --------------------------------------------------------
    # ACTIVITIES
    # --------------------------------------------------------

    elif "activity" in text or "activities" in text:

        reply = (
            "Popular activities in Nepal include trekking, mountain "
            "climbing, paragliding, rafting, wildlife safaris, camping, "
            "hiking and cultural tours."
        )

    # --------------------------------------------------------
    # BEST PLACES
    # --------------------------------------------------------

    elif (
        "best place" in text
        or "places to visit" in text
        or "where should i visit" in text
    ):

        reply = (
            "Some popular places to explore in Nepal include Kathmandu "
            "Valley for culture, Pokhara for nature and adventure, "
            "Everest for Himalayan trekking, Annapurna for trekking, "
            "Chitwan for wildlife and Upper Mustang for Himalayan culture."
        )

    # --------------------------------------------------------
    # NEPAL
    # --------------------------------------------------------

    elif "nepal" in text:

        reply = (
            "Nepal offers Himalayan trekking, mountain adventures, "
            "wildlife, cultural heritage, lakes, traditional villages "
            "and outdoor activities. I can help you explore destinations "
            "or build a travel plan."
        )

    # --------------------------------------------------------
    # GREETING
    # --------------------------------------------------------

    elif any(
        word in text
        for word in [
            "hello",
            "hi",
            "hey",
            "namaste"
        ]
    ):

        reply = (
            "Namaste! 👋 I'm your Guider Nepal AI assistant. "
            "Ask me about Nepal, trekking, destinations, activities "
            "or travel planning."
        )

    # --------------------------------------------------------
    # DEFAULT
    # --------------------------------------------------------

    else:

        reply = (
            "I can currently help with Nepal destinations, trekking, "
            "activities and basic travel planning. Try asking me about "
            "Everest, Pokhara, Annapurna, Mustang, Chitwan or trekking."
        )


    return jsonify({
        "success": True,
        "reply": reply
    })


# ============================================================
# ERROR HANDLERS
# ============================================================

@app.errorhandler(404)
def not_found(error):

    return jsonify({
        "success": False,
        "message": "Route not found"
    }), 404


@app.errorhandler(500)
def internal_error(error):

    return jsonify({
        "success": False,
        "message": "Internal server error"
    }), 500



# ============================================================
# RUN SERVER
# ============================================================

if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )