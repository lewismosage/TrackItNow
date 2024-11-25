import requests

BASE_URL = 'http://localhost:5000/api'

def test_endpoints():
    # Test inventory endpoint
    print("\nTesting /api/inventory")
    response = requests.get(f'{BASE_URL}/inventory')
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json() if response.ok else response.text}")

    # Test locations endpoint
    print("\nTesting /api/locations")
    response = requests.get(f'{BASE_URL}/locations')
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json() if response.ok else response.text}")

if __name__ == "__main__":
    test_endpoints() 