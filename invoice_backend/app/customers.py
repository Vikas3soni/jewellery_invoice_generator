from flask import jsonify


def list_customer(cursor,jeweller_id:str,logger):
    cursor.execute("SELECT * FROM customers WHERE jeweller_id = %s", (jeweller_id,))
    customers = cursor.fetchall()

    # Fetch column names
    column_names = [desc[0] for desc in cursor.description]
    logger.debug(f'list_customer:: len of the data {len(customers)}')
    # Create a list of dictionaries where each dictionary represents a customer
    customers_dict = []
    for customer in customers:
        customer_dict = dict(zip(column_names, customer))
        customers_dict.append(customer_dict)

    return jsonify(customers_dict)

