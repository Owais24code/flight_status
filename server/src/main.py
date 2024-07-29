from flask import Flask, current_app, g, render_template, request, redirect, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from sqlalchemy import inspect
import string
import random
import os
import enum
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()   


db_url = os.environ.get("DATABASE_URL")
if not db_url:
    print("Database url not found")
    exit(1)
    
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = db_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class StatusEnum(enum.Enum):
    scheduled = "scheduled"
    arrived = "arrived"
    cancelled = "cancelled"

class FlishStatus(db.Model):
    __tablename__ = 'flish_status'
    status = db.Column(db.Enum(StatusEnum), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    ticket_id = db.Column(db.String(255), nullable=False, primary_key=True)
    flight_num = db.Column(db.String(255), nullable=False)
    source = db.Column(db.String(255), nullable=False)
    destination = db.Column(db.String(255), nullable=False)
    departure = db.Column(db.DateTime, nullable=False)
    arrival = db.Column(db.DateTime, nullable=False)
    airline = db.Column(db.String(26), nullable=False)
    ident = db.Column(db.String(26), nullable=False)


def seed_db():
    if db.session.query(FlishStatus).count() > 0:
        return
    flights = [
        {'status': StatusEnum.scheduled, 'name': 'IndiGO', 'ticket_id': 'IGO5024-1', 'flight_num': 'IGO5024', 'source': 'BOM', 'destination': 'DEL', 'departure': datetime(2024, 7, 28, 20, 40), 'arrival': datetime(2024, 7, 28, 22, 35), 'airline': 'IndiGO', 'ident': 'A320'},
        {'status': StatusEnum.scheduled, 'name': 'AirAsia India', 'ticket_id': 'IAD778-1', 'flight_num': 'IAD778', 'source': 'BOM', 'destination': 'DEL', 'departure': datetime(2024, 7, 28, 18, 35), 'arrival': datetime(2024, 7, 28, 20, 35), 'airline': 'AirAsia India', 'ident': 'A320'},
        {'status': StatusEnum.scheduled, 'name': 'IndiGO', 'ticket_id': 'IGO2286-1', 'flight_num': 'IGO2286', 'source': 'BOM', 'destination': 'DEL', 'departure': datetime(2024, 7, 28, 17, 30), 'arrival': datetime(2024, 7, 28, 19, 20), 'airline': 'IndiGO', 'ident': 'A320'},
        {'status': StatusEnum.scheduled, 'name': 'Vistara', 'ticket_id': 'VTI754-1', 'flight_num': 'VTI754', 'source': 'BOM', 'destination': 'DEL', 'departure': datetime(2024, 7, 28, 15, 40), 'arrival': datetime(2024, 7, 28, 17, 25), 'airline': 'Vistara', 'ident': 'A320'},
        {'status': StatusEnum.scheduled, 'name': 'IndiGO', 'ticket_id': 'IGO2219-1', 'flight_num': 'IGO2219', 'source': 'BOM', 'destination': 'DEL', 'departure': datetime(2024, 7, 28, 14, 40), 'arrival': datetime(2024, 7, 28, 16, 30), 'airline': 'IndiGO', 'ident': 'A320'},
        {'status': StatusEnum.scheduled, 'name': 'AirAsia India', 'ticket_id': 'IAD549-1', 'flight_num': 'IAD549', 'source': 'BOM', 'destination': 'DEL', 'departure': datetime(2024, 7, 28, 13, 30), 'arrival': datetime(2024, 7, 28, 15, 15), 'airline': 'AirAsia India', 'ident': 'A320'},
        {'status': StatusEnum.scheduled, 'name': 'AirAsia India', 'ticket_id': 'IAD738-1', 'flight_num': 'IAD738', 'source': 'BOM', 'destination': 'DEL', 'departure': datetime(2024, 7, 28, 10, 20), 'arrival': datetime(2024, 7, 28, 12, 15), 'airline': 'AirAsia India', 'ident': 'A320'},
        {'status': StatusEnum.scheduled, 'name': 'IndiGO', 'ticket_id': 'IGO2332-1', 'flight_num': 'IGO2332', 'source': 'BOM', 'destination': 'DEL', 'departure': datetime(2024, 7, 28, 9, 30), 'arrival': datetime(2024, 7, 28, 11, 20), 'airline': 'IndiGO', 'ident': 'A320'},
        {'status': StatusEnum.arrived, 'name': 'IndiGO', 'ticket_id': 'IGO5024-2', 'flight_num': 'IGO5024', 'source': 'BOM', 'destination': 'DEL', 'departure': datetime(2024, 7, 27, 20, 40), 'arrival': datetime(2024, 7, 27, 22, 35), 'airline': 'IndiGO', 'ident': 'A320'},
        {'status': StatusEnum.arrived, 'name': 'AirAsia India', 'ticket_id': 'IAD778-2', 'flight_num': 'IAD778', 'source': 'BOM', 'destination': 'DEL', 'departure': datetime(2024, 7, 27, 18, 35), 'arrival': datetime(2024, 7, 27, 20, 35), 'airline': 'AirAsia India', 'ident': 'A320'},
        {'status': StatusEnum.arrived, 'name': 'IndiGO', 'ticket_id': 'IGO2286-2', 'flight_num': 'IGO2286', 'source': 'BOM', 'destination': 'DEL', 'departure': datetime(2024, 7, 27, 17, 30), 'arrival': datetime(2024, 7, 27, 19, 20), 'airline': 'IndiGO', 'ident': 'A21N'},
        {'status': StatusEnum.arrived, 'name': 'IndiGO', 'ticket_id': 'IGO272P-1', 'flight_num': 'IGO272P', 'source': 'BOM', 'destination': 'DEL', 'departure': datetime(2024, 7, 27, 16, 23), 'arrival': datetime(2024, 7, 27, 18, 7), 'airline': 'IndiGO', 'ident': 'A320'},
        {'status': StatusEnum.arrived, 'name': 'Vistara', 'ticket_id': 'VTI754-2', 'flight_num': 'VTI754', 'source': 'BOM', 'destination': 'DEL', 'departure': datetime(2024, 7, 27, 15, 40), 'arrival': datetime(2024, 7, 27, 17, 25), 'airline': 'Vistara', 'ident': 'A320'},
        {'status': StatusEnum.arrived, 'name': 'AirAsia India', 'ticket_id': 'IAD549-2', 'flight_num': 'IAD549', 'source': 'BOM', 'destination': 'DEL', 'departure': datetime(2024, 7, 27, 13, 30), 'arrival': datetime(2024, 7, 27, 15, 15), 'airline': 'AirAsia India', 'ident': 'A320'},
        {'status': StatusEnum.arrived, 'name': 'AirAsia India', 'ticket_id': 'IAD738-2', 'flight_num': 'IAD738', 'source': 'BOM', 'destination': 'DEL', 'departure': datetime(2024, 7, 27, 10, 20), 'arrival': datetime(2024, 7, 27, 12, 15), 'airline': 'AirAsia India', 'ident': 'A320'},
    ]

    for flight in flights:
        flish_status = FlishStatus(**flight)
        db.session.add(flish_status)
    db.session.commit()
    




@app.route("/", methods=["GET"])
def home(): 
    return "Heelo"


@app.route("/flight", methods=["GET"])
def get_flight():
    ticket_id = request.args.get('ticket_id')
    flight_num = request.args.get('flight_num')
    
    if ticket_id:
        flight = FlishStatus.query.filter_by(ticket_id=ticket_id).first()
    elif flight_num:
        flight = FlishStatus.query.filter_by(flight_num=flight_num).first()
    else:
        return jsonify({"error": "Please provide ticket_id or flight_num"}), 400

    if flight:
        return jsonify({
            'status': flight.status.value,
            'name': flight.name,
            'ticket_id': flight.ticket_id,
            'flight_num': flight.flight_num,
            'source': flight.source,
            'destination': flight.destination,
            'departure': flight.departure.strftime("%Y-%m-%d %H:%M:%S"),
            'arrival': flight.arrival.strftime("%Y-%m-%d %H:%M:%S"),
            'airline': flight.airline,
            'ident': flight.ident
        })
    else:
        return jsonify({"error": "Flight not found"}), 404

@app.route("/search", methods=["GET"])
def search_flights():
    source = request.args.get('source')
    destination = request.args.get('destination')

    if not source or not destination:
        return jsonify({"error": "Please provide both source and destination"}), 400

    flights = FlishStatus.query.filter_by(source=source, destination=destination).all()

    if flights:
        return jsonify([
            {
                'status': flight.status.value,
                'name': flight.name,
                'ticket_id': flight.ticket_id,
                'flight_num': flight.flight_num,
                'source': flight.source,
                'destination': flight.destination,
                'departure': flight.departure.strftime("%Y-%m-%d %H:%M:%S"),
                'arrival': flight.arrival.strftime("%Y-%m-%d %H:%M:%S"),
                'airline': flight.airline,
                'ident': flight.ident
            }
            for flight in flights
        ])
    else:
        return jsonify({"error": "No flights found"}), 404



if __name__ == "__main__":
    with app.app_context():
        # Create an inspector object
        inspector = inspect(db.engine)

        # Check if the 'flish_status' table exists, if not, create it
        if not inspector.has_table('flish_status'):
            db.create_all()
            seed_db()
    app.run(host='0.0.0.0', port=5000, debug=True)
