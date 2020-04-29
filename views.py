from flask import Flask, request, render_template
from utils import connect_mysql
import time

application = Flask(__name__)


@application.route('/mysql', methods=['GET'])
def query_mysql():
    query = request.args.get('query', 'show tables;')
    # password
    # connection = connect_mysql(host='', user='',password='', db='')

    col_name, content, query_time = connection.run_query(query)
    result = {'col_name': col_name, 'result': content, 'query_time': query_time}
    connection.disconnect()
    return result


@application.route('/insert', methods=['GET'])
def insert():
    part_query = request.args.get('query', 'show tables;')
    # password
    # connection = connect_mysql(host='', user='',password='', db='')

    get_last_query = 'select max(order_id) from orders'
    _, last_content, _ = connection.run_query(get_last_query)
    last_id = str(last_content[0][0] + 1)

    user_id = part_query.split(',')[1]
    get_user_query = 'select max(order_number) from orders where user_id = ' + user_id
    _, user_content, _ = connection.run_query(get_user_query)
    order_number = '1' if user_content[0][0] is None else str(user_content[0][0] + 1)
    index_x = part_query.find('x')
    part_query = part_query[:index_x] + order_number + part_query[index_x + 1:]

    insert_query = 'insert into orders (order_id, user_id, order_number, order_dow, order_hour_of_day, days_since_prior_order) values (' + last_id + part_query
    # print(insert_query)
    connection.insert(insert_query)
    query = 'select * from orders where order_id = ' + last_id
    time.sleep(0.5)
    col_name, content, query_time = connection.run_query(query)
    # print(query)
    result = {'col_name': col_name, 'result': content, 'query_time': query_time}
    connection.disconnect()
    return result


@application.route('/', methods=['GET'])
def index():
    return render_template('index.html')
