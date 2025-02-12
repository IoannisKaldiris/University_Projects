import hashlib
import pickle
import socket
import threading
import time

import pandas as pd


class ChordVariantNode:
    def __init__(self, address, port):
        self.address = address
        self.port = port
        self.node_id = self.generate_hash(f"{address}:{port}")
        self.data_storage = {}
        self.next_node = (self.address, self.port)
        self.previous_node = None
        self.node_lock = threading.Lock()

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
                if command == "locate_next":
                    key_id = request.get("id")
                    response = self.locate_next(key_id)
                    connection.sendall(pickle.dumps(response))
                elif command == "store_key":
                    key = request.get("key")
                    value = request.get("value")
                    self.store_key(key, value)
                elif command == "fetch_key":
                    key = request.get("key")
                    value = self.fetch_key(key)
                    connection.sendall(pickle.dumps(value))
                elif command == "remove_key":
                    key = request.get("key")
                    self.remove_key(key)

    def locate_next(self, key_id):
        with self.node_lock:
            if self.previous_node and self.previous_node[1] < key_id <= self.node_id:
                return (self.address, self.port)
            else:
                return self.next_node

    def join_network(self, existing_node):
        if existing_node:
            self.previous_node = None
            self.next_node = self.remote_locate_next(existing_node, self.node_id)
        else:
            self.previous_node = (self.address, self.port)
            self.next_node = (self.address, self.port)

    def remote_locate_next(self, node, key_id):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client:
            client.connect(node)
            request = {"command": "locate_next", "id": key_id}
            client.sendall(pickle.dumps(request))
            response = client.recv(4096)
            return pickle.loads(response)

    def store_key(self, key, value):
        key_id = self.generate_hash(key)
        responsible_node = self.locate_next(key_id)
        if responsible_node == (self.address, self.port):
            with self.node_lock:
                self.data_storage[key_id] = value
        else:
            self.remote_store_key(responsible_node, key, value)

    def remote_store_key(self, node, key, value):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client:
            client.connect(node)
            request = {"command": "store_key", "key": key, "value": value}
            client.sendall(pickle.dumps(request))

    def fetch_key(self, key):
        key_id = self.generate_hash(key)
        responsible_node = self.locate_next(key_id)
        if responsible_node == (self.address, self.port):
            with self.node_lock:
                return self.data_storage.get(key_id, None)
        else:
            return self.remote_fetch_key(responsible_node, key)

    def remote_fetch_key(self, node, key):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client:
            client.connect(node)
            request = {"command": "fetch_key", "key": key}
            client.sendall(pickle.dumps(request))
            response = client.recv(4096)
            return pickle.loads(response)

    def remove_key(self, key):
        key_id = self.generate_hash(key)
        responsible_node = self.locate_next(key_id)
        if responsible_node == (self.address, self.port):
            with self.node_lock:
                if key_id in self.data_storage:
                    del self.data_storage[key_id]
        else:
            self.remote_remove_key(responsible_node, key)

    def remote_remove_key(self, node, key):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client:
            client.connect(node)
            request = {"command": "remove_key", "key": key}
            client.sendall(pickle.dumps(request))


def populate_network_from_file(file_path):
    dataset = pd.read_csv(file_path)
    for _, record in dataset.iterrows():
        key = record['loc_country']
        value = record.to_dict()
        node_list[0].store_key(key, value)
        #print(f'Added {key}: {value}')

# Κύρια εκτέλεση
node_list = []
base_port = 5300
for i in range(6):
    node_instance = ChordVariantNode('localhost', base_port + i)
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
value = node_instance.fetch_key('USA')
end_time = time.time()

print(f"t2: {end_time - start_time:.4f} ")



start_time = time.time()
value = node_instance.remove_key("USA")
end_time = time.time()

print(f"t3: {end_time - start_time:.4f} ")