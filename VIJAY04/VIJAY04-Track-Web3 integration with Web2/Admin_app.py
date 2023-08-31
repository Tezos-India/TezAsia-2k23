from pytezos.crypto.encoding import is_pkh
from kivy.app import App
from kivy.core.window import Window
from kivy.uix.screenmanager import ScreenManager,Screen
from kivy.uix.button import Button
from kivy.uix.label import Label
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.gridlayout import GridLayout
from kivy.uix.scrollview import ScrollView
from kivy.uix.popup import Popup
import mysql.connector
import datetime
import random
import hashlib
def is_valid_public_key(key):
    return is_pkh(key)
def refresh_addr_layouts():
    ticket_addr.refresh()
    history_addr.refresh()
    resellers_addr.refresh()
    remove_reseller_addr.refresh()
def refresh_connection():
    global myDb
    myDb=mysql.connector.connect(host=localhost,user=user_name,password=password,database=database,auth_plugin="mysql_native_password")
ticket_addr=None
history_addr=None
resellers_addr=None
remove_reseller_addr=None
remove_reseller_addr=None
localhost="localhost"
user_name="root"
password="admin123"
database="tezos"
myDb=mysql.connector.connect(host=localhost,user=user_name,password=password,database=database,auth_plugin="mysql_native_password")
class Home(BoxLayout):
    def refresh_all_layouts(self,):
        refresh_addr_layouts()
class Screens(ScreenManager):
    pass
class HomePage(Screen):
    pass
class AddTicketPage(Screen):
    pass
class AddResellerPage(Screen):
    pass
class AddTicket(BoxLayout):
    def get_hash(self,):
        self.ticket_id=self.ids["ticket_id_ti"].text
        self.ticket_price=self.ids["ticket_price_ti"].text
        self.date=datetime.datetime.now().date().strftime('%Y-%m-%d')
        random_num=random.randint(100000, 999999)
        source_input=self.ticket_id+self.ticket_price+self.date+str(random_num)
        sha256_hash=hashlib.sha256()
        sha256_hash.update(source_input.encode('utf-8'))
        self.hashed=sha256_hash.hexdigest()
        self.ids["ticket_hash"].text=self.hashed
    def submitted(self,):
        self.get_hash()
        refresh_connection()
        global mydb
        mycursor=myDb.cursor(buffered=True)
        mycursor.execute("SELECT ticket_id FROM data;")
        registered_tickets=mycursor.fetchall()
        if(not(self.ids["ticket_id_ti"].text==""or self.ids["ticket_price_ti"].text=="")):
            try:
                if((int(self.ids["ticket_id_ti"].text),) in registered_tickets):
                    button=CustomColorButton(text="OK!")
                    label=Label(text="Ticket is already registered",font_size=30)
                    layout=BoxLayout(orientation="vertical")
                    layout.add_widget(label)
                    layout.add_widget(button)
                    popup=CustomPopUp(title="Ticket already available",content=layout,size_hint=(.4,.4))
                    button.bind(on_press=popup.dismiss)
                    popup.open()
                    self.ids["ticket_id_ti"].text=""
                else:
                    refresh_connection()
                    mycursor=myDb.cursor(buffered=True)
                    mycursor.execute(f"INSERT INTO data values ({int(self.ticket_id)},'{self.date}',{float(self.ticket_price)},'notsold','{self.hashed}',{0},'2000-01-01',NULL);")
                    mycursor.execute("commit;")
                    button=CustomColorButton(text="OK!")
                    label=Label(text="Ticket Successfully added",font_size=30)
                    layout=BoxLayout(orientation="vertical")
                    layout.add_widget(label)
                    layout.add_widget(button)
                    popup=CustomPopUp(title="Sucess",content=layout,size_hint=(.4,.4))
                    button.bind(on_press=popup.dismiss)
                    popup.open()
                    self.ids["ticket_id_ti"].text=""
                    self.ids["ticket_price_ti"].text=""
            except:
                button=CustomColorButton(text="OK!")
                label=Label(text="Ticket id/price isn't in compartible type\nOR\nConnection Error",font_size=30)
                layout=BoxLayout(orientation="vertical")
                layout.add_widget(label)
                layout.add_widget(button)
                popup=CustomPopUp(title="Error",content=layout,size_hint=(.4,.4))
                button.bind(on_press=popup.dismiss)
                popup.open()
                self.ids["ticket_id_ti"].text=""
                self.ids["ticket_price_ti"].text=""
            finally:
                refresh_addr_layouts()
        else:
            button=CustomColorButton(text="OK!")
            label=Label(text="Ticket id/price cant be Null",font_size=30)
            layout=BoxLayout(orientation="vertical")
            layout.add_widget(label)
            layout.add_widget(button)
            popup=CustomPopUp(title="Input Error",content=layout,size_hint=(.4,.4))
            button.bind(on_press=popup.dismiss)
            popup.open()
        refresh_addr_layouts()
    def refresh_all_layouts(self,):
        refresh_addr_layouts()
class Menu(BoxLayout):
    pass
class Tickets(ScrollView):
    def __init__(self,**kwargs):
        super().__init__(**kwargs)
        self.refresh()
    def refresh(self,):
        self.clear_widgets()
        refresh_connection()
        mycursor=myDb.cursor(buffered=True)
        mycursor.execute("SELECT * FROM data;")
        self.data=mycursor.fetchall()
        self.grid=GridLayout(cols=3,spacing=20)
        self.grid.padding=[0,0,20,0]
        self.grid.size_hint_y=None
        self.size_hint=(1,1)
        self.grid.bind(minimum_height=self.grid.setter('height'))
        self.instances=[]
        for i in self.data:
            if i[5]==0:
                ticket_id=str(i[0])
                sell_addr=CustomButton(text="Sell",size_hint=(.3,1))
                remove_addr=CustomButton(text="remove",size_hint=(.45,1))
                widget_addr=RoundedLabelExtra(text=f"ticket_id:{i[0]}\ncreated_date:{i[1]}\nprice:{i[2]} XTZ",size_hint_y=None,height=200,color=(1,1,1,1))
                hash=str(i[4])
                self.grid.add_widget(widget_addr)
                self.grid.add_widget(sell_addr)
                self.grid.add_widget(remove_addr)
                self.instances.append([ticket_id,sell_addr,remove_addr,hash,widget_addr])
        self.add_widget(self.grid)
        global ticket_addr
        ticket_addr=self
        for instance in self.instances:
            instance[1].bind(on_press=lambda x:self.sell_warning(x))
            instance[2].bind(on_press=lambda x:self.remove_warning(x))
    def sell_warning(self,instance):
        for obj in self.instances:
            if(obj[1]==instance):
                tick_id=obj[0]
                button=CustomColorButton(text="Click To SELL Or Click anywhere to cancel",size_hint=(1,.5))
                label=Label(text=f"ticket_id:\n\n{obj[0]}\nTicket Hash:\n\n{obj[3]}",font_size=30)
                layout=BoxLayout(orientation="vertical")
                layout.add_widget(label)
                layout.add_widget(button)
                popup=CustomPopUp(title="Are you sure?",content=layout,size_hint=(.8,.5))
                button.bind(on_press=lambda x:self.sell(tick_id))
                popup.open()
        refresh_addr_layouts()
    def sell(self,ticket_id):
        try:
            if(self.check_availability(ticket_id)):
                refresh_connection()
                global mydb
                mycursor=myDb.cursor(buffered=True)
                date=datetime.datetime.now().date().strftime('%Y-%m-%d')
                mycursor.execute(f"UPDATE data SET sold_to='SELF',is_sold=1,sold_date='{date}',transaction_hash=NULL where ticket_id={ticket_id};")
                mycursor.execute("commit;")
                button=CustomColorButton(text="OK!")
                label=Label(text="Sold Successfully",font_size=30)
                layout=BoxLayout(orientation="vertical")
                layout.add_widget(label)
                layout.add_widget(button)
                popup=CustomPopUp(title="Sucess",content=layout,auto_dismiss=False,size_hint=(.4,.4))
                button.bind(on_press=popup.dismiss)
                popup.open()
                refresh_addr_layouts()
            else:
                self.display_unavailabe()
            refresh_addr_layouts()
        except:
            button=CustomColorButton(text="OK!")
            label=Label(text="Unable To Sell,Check connectivity",font_size=30)
            layout=BoxLayout(orientation="vertical")
            layout.add_widget(label)
            layout.add_widget(button)
            popup=CustomPopUp(title="Error",auto_dismiss=False,content=layout,size_hint=(.4,.4))
            button.bind(on_press=popup.dismiss)
            popup.open()
        finally:
            refresh_addr_layouts()
    def remove_warning(self,instance):
        for obj in self.instances:
            if(obj[2]==instance):
                tick_id=obj[0]
                button=CustomColorButton(text="Click To Remove Or Click anywhere to cancel",size_hint=(1,.5))
                label=Label(text=f"ticket_id:\n{obj[0]}",font_size=30)
                layout=BoxLayout(orientation="vertical")
                layout.add_widget(label)
                layout.add_widget(button)
                self.remove_popup=CustomPopUp(title="Are you sure?",content=layout,size_hint=(.8,.5))
                button.bind(on_press=lambda x:self.remove(tick_id))
                self.remove_popup.open()
        refresh_addr_layouts()
    def remove(self,ticket_id):
        if(self.check_availability(ticket_id)):
            refresh_connection()
            global mydb
            mycursor=myDb.cursor(buffered=True)
            mycursor.execute(f"DELETE FROM data WHERE ticket_id='{ticket_id}';");
            mycursor.execute("commit;")
            button=CustomColorButton(text="OK!")
            label=Label(text="Removed Successfully",font_size=30)
            layout=BoxLayout(orientation="vertical")
            layout.add_widget(label)
            layout.add_widget(button)
            popup=CustomPopUp(title="Sucess",auto_dismiss=False,content=layout,size_hint=(.4,.4))
            button.bind(on_press=popup.dismiss)
            popup.open()
        else:
            self.display_unavailabe()
        refresh_addr_layouts()
    def check_availability(self,ticket_id):
        refresh_addr_layouts()
        available_tickets=[]
        for instance in self.data:
            if(instance[5]==0):
                available_tickets.append(instance[0])
        if(int(ticket_id) in available_tickets):
            return 1
        else:
            return 0
    def display_unavailabe(self,):
        button=CustomColorButton(text="ok")
        label=Label(text="No Tickets Found",font_size=30)
        layout=BoxLayout(orientation="vertical")
        layout.add_widget(label)
        layout.add_widget(button)
        popup=CustomPopUp(title="Ticket unavailable",auto_dismiss=False,content=layout,size_hint=(.4,.4))
        button.bind(on_press=popup.dismiss)
        popup.open()
        refresh_addr_layouts()
class History(ScrollView):
    def __init__(self,**kwargs):
        super().__init__(**kwargs)
        self.refresh()
    def refresh(self,):
        self.clear_widgets()
        refresh_connection()
        mycursor=myDb.cursor(buffered=True)
        mycursor.execute("SELECT * from data order by sold_date DESC,ticket_id;")
        data=mycursor.fetchall()
        Transactions=[]
        for transaction in data:
            if(transaction[5]==1):
                Transactions.append(transaction)
        self.grid=GridLayout(cols=1,spacing=20)
        self.grid.size_hint_y=None
        self.size_hint=(1,1)
        self.grid.bind(minimum_height=self.grid.setter('height'))
        for i in Transactions:
            if(i[7]==None):
                self.grid.add_widget(RoundedLabel(text=f"Ticket_id:{i[0]}\nPrice:{i[2]}\nSoldTo:{i[3]}\nSold On:{i[6]}\n \nTicket_Hash:    {i[4][0:32]}\n{i[4][32:63]}\n ",size_hint_y=None,height=400,color=(1,1,1,1)))
            else:
                self.grid.add_widget(RoundedLabel(text=f"Ticket_id:{i[0]}\nPrice:{i[2]}\nSoldTo:{i[3]}\nSold On:{i[6]}\n \nTicket_Hash:    {i[4][0:32]}\n{i[4][32:63]}\n \nTransaction_hash:    {i[7][0:23]}\n{i[7][23:50]}",size_hint_y=None,height=600,color=(1,1,1,1)))
        self.add_widget(self.grid)
        global history_addr
        history_addr=self
class Resellers(ScrollView):
    def __init__(self,**kwargs):
        super().__init__(**kwargs)
        self.refresh()
    def refresh(self,):
        self.clear_widgets()
        global resellers_addr
        resellers_addr=self
        refresh_connection()
        mycursor=myDb.cursor(buffered=True)
        mycursor.execute("SELECT * from resellers order by created_date DESC,name;")
        data=mycursor.fetchall()
        self.grid=GridLayout(cols=1,spacing=20)
        self.grid.size_hint_y=None
        self.size_hint=(1,1)
        self.grid.bind(minimum_height=self.grid.setter('height'))
        for reseller in data:
            self.grid.add_widget(RoundedLabel(text=f"Name:{reseller[0]}\nTezos Public Key:    {reseller[2][0:11]}\n    {reseller[2][11:36]}\n \nCreated on:{reseller[3]}",size_hint_y=None,height=300,color=(1,1,1,1)))
        self.add_widget(self.grid)
class AddReseller(BoxLayout):
    def submitted(self,):
        name=self.ids["reseller_name"].text
        public_key=self.ids["reseller_account"].text
        _password=self.ids["reseller_password"].text
        confirm_password=self.ids["reseller_confirmpassword"].text
        refresh_connection()
        global myDb
        mycursor=myDb.cursor(buffered=True)
        mycursor.execute("SELECT tez_account from resellers;")
        accounts=mycursor.fetchall()
        if(not(name==""or public_key=="" or _password=="" or confirm_password=="")):
            if(_password==confirm_password):
                if(is_valid_public_key(public_key)):
                    myDb=mysql.connector.connect(host=localhost,user=user_name,password=password,database="mysql")
                    mycursor=myDb.cursor(buffered=True)
                    mycursor.execute("SELECT USER FROM USER;")
                    Users=mycursor.fetchall()
                    if((name,) in Users or (public_key,) in accounts):
                        button=CustomColorButton(text="Try Other Name!")
                        label=Label(text="User Already/account Exists",font_size=30)
                        layout=BoxLayout(orientation="vertical")
                        layout.add_widget(label)
                        layout.add_widget(button)
                        popup=CustomPopUp(title="Unable to create User",auto_dismiss=False,content=layout,size_hint=(.4,.4))
                        button.bind(on_press=popup.dismiss)
                        popup.open()
                        self.ids["reseller_name"].text=""
                        self.ids["reseller_account"].text=""
                    else:
                        try:
                            mycursor.execute(f"CREATE USER '{name}'@'{localhost}' IDENTIFIED BY '{_password}';")
                            mycursor.execute(f"GRANT SELECT,UPDATE ON tezos.data TO '{name}'@'{localhost}';")
                            mycursor.execute("FLUSH PRIVILEGES;")
                            mycursor.close()
                            button=CustomColorButton(text="OK!")
                            label=Label(text="User Created",font_size=30)
                            layout=BoxLayout(orientation="vertical")
                            layout.add_widget(label)
                            layout.add_widget(button)
                            popup=CustomPopUp(title="Sucess",auto_dismiss=False,content=layout,size_hint=(.4,.4))
                            button.bind(on_press=popup.dismiss)
                            popup.open()
                            date=datetime.datetime.now().date().strftime('%Y-%m-%d')
                            refresh_connection()
                            mycursor=myDb.cursor(buffered=True)
                            mycursor.execute(f"INSERT INTO resellers VALUES ('{name}','{_password}','{public_key}','{date}');")
                            mycursor.execute("COMMIT;")
                        except:
                            button=CustomColorButton(text="OK!")
                            label=Label(text="Connection Error",font_size=30)
                            layout=BoxLayout(orientation="vertical")
                            layout.add_widget(label)
                            layout.add_widget(button)
                            popup=CustomPopUp(title="Failed",auto_dismiss=False,content=layout,size_hint=(.4,.4))
                            button.bind(on_press=popup.dismiss)
                            popup.open()
                        finally:
                            refresh_addr_layouts()
                else:
                    button=CustomColorButton(text="OK!")
                    label=Label(text="Invalid TEZOS ACCOUNT",font_size=30)
                    layout=BoxLayout(orientation="vertical")
                    layout.add_widget(label)
                    layout.add_widget(button)
                    popup=CustomPopUp(title="Failed",auto_dismiss=False,content=layout,size_hint=(.4,.4))
                    button.bind(on_press=popup.dismiss)
                    popup.open()
                    self.ids["reseller_account"].text=""
            else:
                button=CustomColorButton(text="Retry!")
                label=Label(text="Confirm password is not same as password",font_size=30)
                layout=BoxLayout(orientation="vertical")
                layout.add_widget(label)
                layout.add_widget(button)
                popup=CustomPopUp(title="Confirm Password",auto_dismiss=False,content=layout,size_hint=(.4,.4))
                button.bind(on_press=popup.dismiss)
                popup.open()
                self.ids["reseller_confirmpassword"].text=""
        else:
            button=CustomColorButton(text="OK!")
            label=Label(text="One Or More Than One Feilds Is/Are Empty",font_size=30)
            layout=BoxLayout(orientation="vertical")
            layout.add_widget(label)
            layout.add_widget(button)
            popup=CustomPopUp(title="Input Error",auto_dismiss=False,content=layout,size_hint=(.4,.4))
            button.bind(on_press=popup.dismiss)
            popup.open()
        refresh_addr_layouts()
class RemoveReseller(BoxLayout):
    def __init__(self,**kwargs):
        super().__init__(**kwargs)
        self.Users=[]
        self.refer=0
        global remove_reseller_addr
        remove_reseller_addr=self
        self.refresh()
    def refresh(self,):
        self.refer+=1
        myDb=mysql.connector.connect(host=localhost,user=user_name,password=password,database="mysql")
        mycursor=myDb.cursor(buffered=True)
        mycursor.execute("SELECT USER FROM USER ORDER BY USER;")
        self.Users=mycursor.fetchall()
        tempory_user=[]
        for user in self.Users:
            if (user[0] in ['mysql.infoschema','mysql.session','mysql.sys','root']):
                pass
            else:
                tempory_user.append(user[0])
        self.Users=tempory_user
        if(self.refer >=2):
            self.ids['user'].values=self.Users
    def submitted(self,):
        selected_user=self.ids["user"].text
        if(selected_user=="Select a user"):
            button=CustomColorButton(text="Retry!")
            label=Label(text="User Have'nt Selected",font_size=30)
            layout=BoxLayout(orientation="vertical")
            layout.add_widget(label)
            layout.add_widget(button)
            popup=CustomPopUp(title="Select a User",auto_dismiss=True,content=layout,size_hint=(.4,.4))
            button.bind(on_press=popup.dismiss)
            popup.open()
            refresh_addr_layouts()
        else:
            try:
                myDb=mysql.connector.connect(host=localhost,user=user_name,password=password,database="mysql")
                mycursor=myDb.cursor(buffered=True)
                mycursor.execute(f"REVOKE ALL PRIVILEGES ON *.* FROM '{selected_user}'@'localhost';")
                mycursor.execute(f"DROP USER '{selected_user}'@'localhost';")
                myDb=mysql.connector.connect(host=localhost,user=user_name,password=password,database=database,auth_plugin="mysql_native_password")
                mycursor=myDb.cursor(buffered=True)
                mycursor.execute(f"DELETE FROM resellers WHERE name='{selected_user}';")
                mycursor.execute("COMMIT;")
                button=CustomColorButton(text="Retry!")
                label=Label(text="User Removed Successfully",font_size=30)
                layout=BoxLayout(orientation="vertical")
                layout.add_widget(label)
                layout.add_widget(button)
                popup=CustomPopUp(title="Sucess",auto_dismiss=False,content=layout,size_hint=(.4,.4))
                button.bind(on_press=popup.dismiss)
                popup.open()
            except:
                button=CustomColorButton(text="Retry!")
                label=Label(text="User Unable to remove Check Connection",font_size=30)
                layout=BoxLayout(orientation="vertical")
                layout.add_widget(label)
                layout.add_widget(button)
                popup=CustomPopUp(title="Connection Error",auto_dismiss=False,content=layout,size_hint=(.4,.4))
                button.bind(on_press=popup.dismiss)
                popup.open()
            finally:
                refresh_addr_layouts()
    def backed(self,):
            refresh_addr_layouts()
class RemoveResellerPage(Screen):
    pass
class RoundedLabel(Label):
    pass
class RoundedLabelExtra(Label):
    pass
class CustomButton(Button):
    pass
class CustomPopUp(Popup):
    pass
class CustomColorButton(Button):
    pass
class Admin_app(App):
    def build(self,):
        self.title="Admin Panel"
        Window.clearcolor=(1,1,1,1)
        pass
Admin_app().run()
