from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework.reverse import reverse
from rest_framework.test import APIClient

from users.models import Customer


class CustomUserManagerTest(TestCase):
    def test_create_user(self):
        User = get_user_model()
        password = "foo"
        user = User.objects.create_user(email="test@user.com", password=password)
        self.assertEqual(user.email, "test@user.com")
        self.assertTrue(user.password)

        # Check that password isn't in plain text
        self.assertNotEqual(user.password, password)

        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        try:
            self.assertIsNone(user.username)
        except AttributeError:
            pass
        with self.assertRaises(TypeError):
            Customer.objects.create_user()
        with self.assertRaises(TypeError):
            Customer.objects.create_user(email="")
        with self.assertRaises(ValueError):
            Customer.objects.create_user(email="", password="foo")

    def test_create_superuser(self):
        User = get_user_model()
        admin_user = User.objects.create_superuser(email="super@user.com", password="foo")
        self.assertEqual(admin_user.email, "super@user.com")
        self.assertTrue(admin_user.is_active)
        self.assertTrue(admin_user.is_staff)
        self.assertTrue(admin_user.is_superuser)
        try:
            self.assertIsNone(admin_user.username)
        except AttributeError:
            pass
        with self.assertRaises(ValueError):
            Customer.objects.create_superuser(
                email="super@user.com", password="foo", is_superuser=False)


class CustomerTest(TestCase):
    def setUp(self):
        self.client = APIClient()

        # Create first customer
        url = reverse('customer-create')
        self.client.post(url, {'email': 'customer1@user.com', 'password': 'foo'})

    def test_create_customer(self):
        # Create second customer
        url = reverse('customer-create')
        response = self.client.post(url, {'email': 'customer2@user.com', 'password': 'foo'})

        self.assertEqual(response.status_code, 201)
        self.assertEqual(Customer.objects.count(), 2)
        self.assertEqual(Customer.objects.last().email, "customer2@user.com")

    def test_retrieve_customer(self):
        # Retrieve first customer
        url = reverse('customer-detail', kwargs={'pk': 1})
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(Customer.objects.count(), 1)
        self.assertEqual(Customer.objects.last().email, "customer1@user.com")
