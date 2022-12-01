import sqlite3, sqlLib
from sqlite3 import Error

def OIresult(rows):
    print("{0:^14} {1:^14} {2:^15} {3:^13}".format(
        "Product ID", "Quantity", "Item Price ($)", "Tax Price ($)")
    )
    print("{0:14} {1:14} {2:15} {3:13}".format("-"*14, "-"*14, "-"*15, "-"*13))

    for row in rows:
        prodID = row[0]
        quant = int(row[1])
        itemPrice = float(row[2])
        taxPrice = float(row[3])

        print("{0:^14} {1:^14} {2:^15.2f} {3:^13.2f}".format(
            prodID, quant, itemPrice, taxPrice)
        )

def prodInsertInputs():
    p = []

    print("Please enter the following information:")
    pid = input("Product ID: ")
    p.append(pid)

    vendor = input("Vendor ID (BRS01, BRS02, FRB01, JTS01): ")
    p.append(vendor)

    name = input("Product Name: ")
    p.append(name)

    price = input("Product Price: $")
    p.append(price)

    desc = input("Product Description: ")
    p.append(desc)

    return p

def prodResult(rows):
    print("{0:^13} {1:^13} {2:^20} {3:^15} {4:^46}".format(
        "Product ID", "Vendor ID", "Name", "Price ($)", "Description")
    )

    print("{0:13} {1:13} {2:20} {3:15} {4:46}".format(
        "-"*13, "-"*13, "-"*20, "-"*15, "-"*46)
    )

    for row in rows:
        prodID = row[0]
        vendID = row[1]
        name = row[2]
        price = float(row[3])
        desc = row[4]

        print("{0:^13} {1:^13} {2:^20} {3:^15.2f} {4:^46}".format(
            prodID, vendID, name, price, desc)
        )

def vendInsertInputs():
    v = []

    print("Please enter the following information:")
    vid = input("Vendor ID: ")
    v.append(vid)

    name = input("Vendor Name: ")
    v.append(name)

    address = input("Vendor Address: ")
    v.append(address)

    city = input("Vendor City: ")
    v.append(city)

    state = input("Vendor State: ")
    v.append(state)

    zip = input("Vendor Zip Code: ")
    v.append(zip)

    country = input("Vendor Country: ")
    v.append(country)

    return v

def vendResult(rows):
    print("{0:^13} {1:^20} {2:^20} {3:^20} {4:^10} {5:^10} {6:^10}".format(
        "Vendor ID", "Name", "Address", "City", "State", "Zip", "Country")
    )

    print("{0:13} {1:20} {2:20} {3:20} {4:10} {5:10} {6:10}".format(
        "-"*13, "-"*20, "-"*20, "-"*20, "-"*10, "-"*10, "-"*10)
    )

    for row in rows:
        vendID = row[0]
        name = row[1]
        address = row[2]
        city = row[3]
        state = row[4]
        zip = row[5]
        country = row[6]

        print("{0:^13} {1:^20} {2:^20} {3:^20} {4:^10} {5:^10} {6:^10}".format(
            vendID, name, address, city, state, zip, country)
        )

def custResult(rows):
    print("{0:^20} {1:^20} {2:^20} {3:^20} {4:^20} {5:^20} {6:^20}".format(
        "Customer ID", "Name", "Address", "City", "State", "Zip", "Email")
    )

    print("{0:20} {1:20} {2:20} {3:20} {4:20} {5:20} {6:20}".format(
        "-"*20, "-"*20, "-"*20, "-"*20, "-"*20, "-"*20, "-"*20)
    )

    for row in rows:
        custID = row[0]
        name = row[1]
        address = row[2]
        city = row[3]
        state = row[4]
        zip = row[5]
        email = row[6]

        print("{0:^20} {1:^20} {2:^20} {3:^20} {4:^20} {5:^20} {6:^20}".format(
            custID, name, address, city, state, zip, email)
        )

def main():
    database = 'tysql_copy.sqlite'
    conn = sqlLib.create_connection(database)

    #result = sqlLib.select_orderItems(conn)
    #OIresult(result)

    #product = prodInsertInputs()
    #rowID = sqlLib.insert_product(conn, product)
    #print(rowID)

    #products = sqlLib.select_products(conn)
    #prodResult(products)

    #vendor = vendInsertInputs()
    #rowID = sqlLib.insert_vendor(conn, vendor)
    #print(rowID)

    #vend_id = input("Enter a vendor ID: ")
    #vendor = sqlLib.select_vendors(conn, vend_id)
    #vendResult(vendor)

    #sqlLib.update_customer(conn, '1000000005', ['Carolyn Fern', 'fern@toystore.com'])
    customer = sqlLib.select_customer(conn, '1000000005')
    custResult(customer)


if __name__ == '__main__':
    main()