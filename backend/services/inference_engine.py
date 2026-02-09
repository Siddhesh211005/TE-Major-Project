class GNN_Detector:
    def predict_threat(self, data):
        # Placeholder for predictions
        label = "Unknown"
        explainability_vector = []

        # Example conditional logic for threat detection
        if data['burst_rate'] > 100:
            label = "High Burst Rate"
            explainability_vector.append("High Burst Rate")
        if data['port'] in [22, 23, 80]:
            label = "Potentially Dangerous Port"
            explainability_vector.append("Dangerous Port")
        if data['unknown_port']:
            label = "Unknown Port"
            explainability_vector.append("Unknown Port")

        return label, explainability_vector
