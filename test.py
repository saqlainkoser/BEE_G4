import json

def generate_data(num_documents):
  data = []
  for i in range(1, num_documents + 1):
    data.append({
      "_id": i,
      "name": f"Person {i}",
      "age": 30 + i,  # Adjust age generation logic as needed
      "phone_no": f"123456789{i}"  # Adjust phone number generation logic as needed
    })
  return data

data = generate_data(25)
print(json.dumps(data, indent=2))
