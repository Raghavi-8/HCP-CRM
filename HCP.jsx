import { useState } from "react";
import axios from "axios";

function HCP() {
    const [interaction, setInteraction] = useState({
        hcpName: "smith",
        interactionType: "phone call",
        date: "14-7-2026",
        time: "11:43",
        attendees: "Medical Representative, Dr. Smith",
        topics: "Discussed new diabetes medication and dosage.",
        materials: "Product Brochure",
        samples: "2 Sample Kits",
        sentiment: "Positive",
        outcomes: "Doctor agreed to evaluate the medicine.",
        followUp: "Schedule another visit next week.",
        summary: "Successful discussion about diabetes treatment."
    });
    const [message, setMessage] = useState("");
    const handleLog = async () => {
        alert("button clicked")
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/log-interaction",
                {
                    message: message,
                }
            );
            console.log("Response", response.data);

            setInteraction(response.data);
            setMessage("");
        } catch (error) {
            console.error("Axios Error:", error);
            alert("Error! Check console.");
        }
    };

    return (
        <div className="container-fluid p-4">
            <h2 className="fw-bold mb-4">Log HCP Interaction</h2>

            <div className="row">
                <div className="col-lg-8" style={{ height: "85vh", overflowY: "auto" }}>
                    Left Form
                    <div className="text-start">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Name : </label>
                                <input type="text"
                                    className="form-control"
                                    value={interaction.hcpName}
                                    placeholder="Auto-filled"
                                    readOnly></input>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">interaction type : </label>
                                <select className="form-select" value={interaction.interactionType} disabled>
                                    <option>select interaction type</option>
                                    <option>In-person visit</option>
                                    <option>Virtual Meeting</option>
                                    <option>Phone call</option>
                                    <option>Email</option>
                                    <option>Conference</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Date : </label>
                                <input type="text"
                                    className="form-control"
                                    value={interaction.date}
                                    placeholder="Auto-filled"
                                    readOnly></input>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Time : </label>
                                <input type="text"
                                    className="form-control"
                                    value={interaction.time}
                                    placeholder="Auto-filled"
                                    readOnly></input>
                            </div>
                        </div>
                        <div className="row">
                            <label className="form-label">Attendees</label>
                            <input type="text"
                                className="form-control"
                                value={interaction.attendees}
                                placeholder="Auto-filled"
                                readOnly></input>

                        </div>
                        <div className="row">
                            <label className="form-label">Topics Discussed</label>
                            <textarea
                                className="form-control"
                                rows="2"
                                value={interaction.topics}
                                placeholder="Enter key discussion points..."
                                readOnly></textarea>
                        </div>
                        <p className="small text-primary">🎙️summerized from voice note (Requires consent)</p>
                        <p className="small ">Materials Shared / Samples Distributed</p>
                        <p className="small">Materials Shared</p>
                        <div className="input-group mb-3">
                            <input type="text"
                                placeholder="Brochers"
                                className="form-control"
                                value={interaction.materials}
                                readOnly></input>

                            <button className="btn btn-small btn-light border" type="button">
                                🔍 Search/Add
                            </button>
                        </div>
                        <p className="small">Samples Distributed</p>
                        <div className="input-group mb-3">
                            <input type="text"
                                value={interaction.samples}
                                className="form-control"
                                readOnly></input>

                            <button className="btn btn-small btn-light border" type="button">
                                + Add Sample
                            </button>
                        </div>

                        <div className="row">
                            <label className="form-label fw-bold">
                                Observed/Inferred HCP Sentiment
                            </label>
                        </div>
                        <div className="mb-3">
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="sentiment"
                                    value="Positive"
                                    checked={interaction.sentiment === "Positive"}
                                    readOnly
                                />
                                <label className="form-check-label">😊 Positive</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="sentiment"
                                    value="Neutral"
                                    checked={interaction.sentiment === "Neutral"}
                                    readOnly
                                />
                                <label className="form-check-label">😐 Neutral</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="sentiment"
                                    value="Negative"
                                    checked={interaction.sentiment === "Negative"}
                                    readOnly
                                />
                                <label className="form-check-label">😞 Negative</label>
                            </div>
                        </div>
                        <div className="row">
                            <label className="form-label ">Outcomes</label>
                            <textarea
                                className="form-control"
                                rows="2"
                                value={interaction.outcomes}
                                readOnly></textarea>
                        </div>
                        <div className="row">
                            <label className="form-label ">Follow-up Actions</label>
                            <textarea
                                className="form-control"
                                rows="2"
                                value={interaction.followUp}
                                readOnly></textarea>
                        </div>
                        <div className="row">
                            <label className="form-label value={interaction.followUps}">Summary</label>
                            <textarea
                                className="form-control"
                                rows="2"
                                value={interaction.summary}
                                readOnly></textarea>
                        </div>

                    </div>
                </div>
                <div className="col-lg-4" style={{ height: "85vh" }}>
                    AI Assistant
                    <div className="card h-100">

                        <div className="card-header">
                            <h5>🤖 AI Assistant</h5>
                            <small>Log interaction details here via chat</small>
                        </div>

                        <div className="card-body">
                            <div className="alert alert-info">
                                Log interaction details here (e.g. "Met Dr. Smith...")
                            </div>
                        </div>

                        <div className="card-footer d-flex">
                            <textarea
                                className="form-control"
                                placeholder="Describe Interaction..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>

                            <button className="btn btn-primary " onClick={handleLog}>
                                Log
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    );
};

export default HCP