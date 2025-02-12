import hashlib
import pickle
import socket
import threading
import time

import pandas as pd


class PastryNode:
    def __init__(self, address, port):
        self.address = address
        self.port = port
        self.node_id = self.generate_hash(f"{address}:{port}")
        self.data_store = {}
        self.routing_table = {}
        self.neighborhood_set = {}
        self.leaf_set = {}
        self.thread_lock = threading.Lock()

    def generate_hash(self, key):
        return int(hashlib.sha1(key.encode()).hexdigest(), 16) % (2 ** 160)

    def initialize(self):
        threading.Thread(target=self.node_listener).start()

    def node_listener(self):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as server:
            server.bind((self.address, self.port))
            server.listen()
            while True:
                connection, client_address = server.accept()
                threading.Thread(target=self.handle_request, args=(connection,)).start()

    def handle_request(self, connection):
        with connection:
            message_data = connection.recv(4096)
            if message_data:
                request = pickle.loads(message_data)
                command = request.get("command")
                if command == "route_message":
                    key_id = request.get("id")
                    response = self.route_message(key_id)
                    connection.sendall(pickle.dumps(response))
                elif command == "store_data":
                    key = request.get("key")
                    value = request.get("value")
                    self.store_data(key, value)
                elif command == "retrieve_data":
                    key = request.get("key")
                    value = self.retrieve_data(key)
                    connection.sendall(pickle.dumps(value))
                elif command == "remove_data":
                    key = request.get("key")
                    self.remove_data(key)

    def route_message(self, key_id):
        with self.thread_lock:
            if key_id in self.leaf_set:
                return self.leaf_set[key_id]
            else:
                return self.routing_table.get(key_id, (self.address, self.port))

    def join_network(self, existing_node):
        if existing_node:
            response = self.remote_route_message(existing_node, self.node_id)
            if isinstance(response, dict):  
                self.routing_table = response
            else:
                
                self.routing_table = {}
        else:
            self.leaf_set[self.node_id] = (self.address, self.port)


    def remote_route_message(self, node, key_id):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client:
            client.connect(node)
            request = {"command": "route_message", "id": key_id}
            client.sendall(pickle.dumps(request))
            response = client.recv(4096)
            return pickle.loads(response)

    def store_data(self, key, value):
        key_id = self.generate_hash(key)
        responsible_node = self.route_message(key_id)
        if responsible_node == (self.address, self.port):
            with self.thread_lock:
                self.data_store[key_id] = value
        else:
            self.remote_store_data(responsible_node, key, value)

    def remote_store_data(self, node, key, value):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client:
            client.connect(node)
            request = {"command": "store_data", "key": key, "value": value}
            client.sendall(pickle.dumps(request))

    def retrieve_data(self, key):
        key_id = self.generate_hash(key)
        responsible_node = self.route_message(key_id)
        if responsible_node == (self.address, self.port):
            with self.thread_lock:
                return self.data_store.get(key_id, None)
        else:
            return self.remote_retrieve_data(responsible_node, key)

    def remote_retrieve_data(self, node, key):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client:
            client.connect(node)
            request = {"command": "retrieve_data", "key": key}
            client.sendall(pickle.dumps(request))
            response = client.recv(4096)
            return pickle.loads(response)

    def remove_data(self, key):
        key_id = self.generate_hash(key)
        responsible_node = self.route_message(key_id)
        if responsible_node == (self.address, self.port):
            with self.thread_lock:
                if key_id in self.data_store:
                    del self.data_store[key_id]
        else:
            self.remote_remove_data(responsible_node, key)

    def remote_remove_data(self, node, key):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client:
            client.connect(node)
            request = {"command": "remove_data", "key": key}
            client.sendall(pickle.dumps(request))


def populate_network_from_file(file_path):
    dataset = pd.read_csv(file_path)
    for _, record in dataset.iterrows():
        key = record['loc_country']
        value = record.to_dict()
        node_list[0].store_data(key, value)
        #print(f'Added {key}: {value}')

# Κύρια εκτέλεση
node_list = []
base_port = 5200
for i in range(5):
    node_instance = PastryNode('localhost', base_port + i)
    if i == 0:
        node_instance.join_network(None)
    else:
        node_instance.join_network(('localhost', base_port))
    node_instance.initialize()
    node_list.append(node_instance)
    time.sleep(1)

start_time = time.time()
populate_network_from_file('coffee_analysis.csv')
end_time = time.time()

print(f"t1: {end_time - start_time:.4f} ")


start_time = time.time()
value = node_instance.retrieve_data('USA')
end_time = time.time()

print(f"t2: {end_time - start_time:.4f} ")



start_time = time.time()
value = node_instance.remove_data("USA")
end_time = time.time()

print(f"t3: {end_time - start_time:.4f} ")