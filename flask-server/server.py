from flask import Flask, request, jsonify
import psycopg2
import string

app = Flask(__name__)


def checkUser(username, password):
    conn = psycopg2.connect(
        database="shop",
        user='postgres',
        password='pwd',
        host='localhost',
        port='5432'
    )
    cur = conn.cursor()
    cur.execute('select username, password, isadmin from users;')
    rows = cur.fetchall()
    login = False
    isadmin = False
    for r in rows:
        print(r)
        if (username == r[0] and password == r[1]):
            isadmin = r[2]
            login = True
            break
    cur.close()
    conn.close()
    return (login, isadmin)



def updateDatabase(fruitChoice, changedQty):
    conn = psycopg2.connect(
        database="shop",
        user='postgres',
        password='pwd',
        host='localhost',
        port='5432'
    )
    cur = conn.cursor()
    print(f'UPDATE fruits SET quantity = {changedQty} WHERE name = \'{fruitChoice}\';')
    cur.execute(f'UPDATE fruits SET quantity = {changedQty} WHERE name = \'{fruitChoice}\';')
    conn.commit()
    print("UPDATED SUCCESSFULLY!!!")
    cur.close()
    conn.close()

def refreshFruits():
    conn = psycopg2.connect(
        database="shop",
        user='postgres',
        password='pwd',
        host='localhost',
        port='5432'
    )
    cur = conn.cursor()
    cur.execute('select name, quantity from fruits;')
    rows = cur.fetchall()

    data = []

    for r in rows:
        print(r)
        data.append({"Fruit": r[0], "Quantity": r[1]})

    cur.close()
    conn.close()
    return data

def userCheck(username, phone):
    conn = psycopg2.connect(
        database="shop",
        user='postgres',
        password='pwd',
        host='localhost',
        port='5432'
    )
    cur = conn.cursor()
    cur.execute('select username, phone_number from users;')
    rows = cur.fetchall()
    cur.close
    conn.close
    for r in rows:
        if (username == r[0]):
            return 1
        elif (phone == r[1]):
            return 2
    return 0


def registerUser(fname, lname, username, password, phone):
    conn = psycopg2.connect(
        database="shop",
        user='postgres',
        password='pwd',
        host='localhost',
        port='5432'
    )
    cur = conn.cursor()
    cur.execute(f'INSERT INTO users (fname, lname, username, password, phone_number, isAdmin) VALUES (\'{fname}\', \'{lname}\', \'{username}\', \'{password}\', \'{phone}\', FALSE);')
    conn.commit()
    print("USER REGISTERED SUCCESSFULLY!!!")
    cur.close
    conn.close

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    fname = data.get("fname")
    lname = data.get("lname")
    username = data.get("username")
    password = data.get("password")
    phone = data.get("phone")
    print(fname, lname, username, password, phone)
    status = userCheck(username, phone)
    if status == 1:
        return jsonify({"message": "Username already exists"}), 400
    elif status == 2:
        return jsonify({"message": "Another user already registered on this phone number"}), 400
    elif status == 0:
        registerUser(fname, lname, username, password, phone)
        return jsonify({"message": "User registeres successfully"}), 200


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    enteredUser = data.get("username")
    enteredPass = data.get("password")
    isLogin, isAdmin = checkUser(enteredUser, enteredPass)
    print(enteredUser, enteredPass, isLogin, isAdmin)
    if isLogin:
        print("Successful Log In!")
        return jsonify({"message": "success", "admin": isAdmin}), 200
    return jsonify({"message": "fail"}), 400

@app.route("/get_fruitsDB")
def getFruitsDB():
    fruits = refreshFruits()
    print("DATABASE DATA FETCHED SUCCESSFULLY!!!", fruits)
    return jsonify(fruits)

@app.route("/get_qty", methods=["POST"])
def get_qty():
    fruits = refreshFruits()
    print("Getting quantity...")
    data = request.get_json()
    fruits = refreshFruits()
    frtname = data.get('frtName')
    qty = int(data.get('qty'))
    print(frtname, qty)
    print (fruits)
    fruitExists = False
    index = -1
    for i in range(len(fruits)):
        print(frtname.lower(), fruits[i]['Fruit'].lower())
        if (frtname.lower() == fruits[i]['Fruit'].lower()):
            fruitExists = True
            index = i
            break
    if (fruitExists == False):
        return jsonify ({"message": "Invalid Fruit"}), 400


    acceptedQty = 0

    if qty>0 and qty<= fruits[index]['Quantity']:
        print("Valid quantity!")
        msg = "Fruits Purchased SUCCESSFULLY!!!"
        acceptedQty = qty
    elif qty>fruits[index]['Quantity']:
        print("Quantity too HIGH!")
        msg = "Not enough fruits! Entire stock Purchased."
        acceptedQty = fruits[index]['Quantity']
    else:
        print("Negative quantity entered.")
        msg = "Negative quantities not allowed."

    print(frtname, acceptedQty)
    updateDatabase(fruits[index]['Fruit'], fruits[index]['Quantity']-acceptedQty)
    print(fruits)
    return jsonify({"message": msg, "qtyPurchased": acceptedQty, "qtyRemaining": fruits[index]['Quantity']}), 200



if __name__ == "__main__":
    fruits = refreshFruits()
    print(f"Today's fruits list is {fruits}")
    app.run(debug=True)