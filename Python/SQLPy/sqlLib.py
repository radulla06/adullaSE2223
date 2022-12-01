import sqlite3
from sqlite3 import Error

# Create a connection to the SQLite database
def create_connection(db_file):
    try:
        conn = sqlite3.connect(db_file)
        print("Database connection established")
        return conn
    except Error as e:
        print(e)

    return None

def select_orderItems(conn):
    cur = conn.cursor()
    cur.execute('''SELECT prod_id, quantity, item_price, quantity * item_price * 1.07
                    AS 'taxed_price(7%)'
                    FROM OrderItems
                    WHERE order_num = 20006;''')

    rows = cur.fetchall()

    cur.close()
    return rows

def insert_product(conn, product):
    sql = '''INSERT INTO Products(prod_id, vend_id, prod_name, prod_price, prod_desc)
            VALUES(?,?,?,?,?);'''
    cur = conn.cursor()
    cur.execute(sql, product)
    conn.commit()
    conn.close()
    return cur.lastrowid

def select_products(conn):
    cur = conn.cursor()
    cur.execute('''SELECT * FROM Products;''')

    rows = cur.fetchall()

    cur.close()
    return rows

def insert_vendor(conn, vendor):
    sql = '''INSERT INTO Vendors(vend_id, vend_name, vend_address, vend_city, vend_state, vend_zip, vend_country)
            VALUES(?,?,?,?,?,?,?);'''
    cur = conn.cursor()
    cur.execute(sql, vendor)
    conn.commit()
    cur.close()
    return cur.lastrowid

def select_vendors(conn, vendor_id):
    cur = conn.cursor()
    cur.execute('''SELECT * FROM Vendors WHERE vend_id = ?;''', (vendor_id,))

    rows = cur.fetchall()

    cur.close()
    return rows

def update_customer(conn, custID, contactInfo):
    sql = '''UPDATE Customers
            SET cust_name = ?, cust_email = ?
            WHERE cust_id = ?;'''
    cur = conn.cursor()
    cur.execute(sql, (contactInfo[0], contactInfo[1], custID))
    conn.commit()
    cur.close()

def select_customer(conn, custID):
    cur = conn.cursor()
    cur.execute('''SELECT * FROM Customers WHERE cust_id = ?;''', (custID,))

    rows = cur.fetchall()

    cur.close()
    return rows