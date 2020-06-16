/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("../plugin/protobuf");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.addressbook = (function() {

    /**
     * Namespace addressbook.
     * @exports addressbook
     * @namespace
     */
    var addressbook = {};

    addressbook.Person = (function() {

        /**
         * Properties of a Person.
         * @memberof addressbook
         * @interface IPerson
         * @property {string} name Person name
         * @property {number} id Person id
         */

        /**
         * Constructs a new Person.
         * @memberof addressbook
         * @classdesc Represents a Person.
         * @implements IPerson
         * @constructor
         * @param {addressbook.IPerson=} [properties] Properties to set
         */
        function Person(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Person name.
         * @member {string} name
         * @memberof addressbook.Person
         * @instance
         */
        Person.prototype.name = "";

        /**
         * Person id.
         * @member {number} id
         * @memberof addressbook.Person
         * @instance
         */
        Person.prototype.id = 0;

        /**
         * Creates a new Person instance using the specified properties.
         * @function create
         * @memberof addressbook.Person
         * @static
         * @param {addressbook.IPerson=} [properties] Properties to set
         * @returns {addressbook.Person} Person instance
         */
        Person.create = function create(properties) {
            return new Person(properties);
        };

        /**
         * Encodes the specified Person message. Does not implicitly {@link addressbook.Person.verify|verify} messages.
         * @function encode
         * @memberof addressbook.Person
         * @static
         * @param {addressbook.IPerson} message Person message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Person.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.id);
            return writer;
        };

        /**
         * Encodes the specified Person message, length delimited. Does not implicitly {@link addressbook.Person.verify|verify} messages.
         * @function encodeDelimited
         * @memberof addressbook.Person
         * @static
         * @param {addressbook.IPerson} message Person message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Person.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Person message from the specified reader or buffer.
         * @function decode
         * @memberof addressbook.Person
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {addressbook.Person} Person
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Person.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.addressbook.Person();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.id = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("name"))
                throw $util.ProtocolError("missing required 'name'", { instance: message });
            if (!message.hasOwnProperty("id"))
                throw $util.ProtocolError("missing required 'id'", { instance: message });
            return message;
        };

        /**
         * Decodes a Person message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof addressbook.Person
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {addressbook.Person} Person
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Person.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Person message.
         * @function verify
         * @memberof addressbook.Person
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Person.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message.name))
                return "name: string expected";
            if (!$util.isInteger(message.id))
                return "id: integer expected";
            return null;
        };

        /**
         * Creates a Person message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof addressbook.Person
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {addressbook.Person} Person
         */
        Person.fromObject = function fromObject(object) {
            if (object instanceof $root.addressbook.Person)
                return object;
            var message = new $root.addressbook.Person();
            if (object.name != null)
                message.name = String(object.name);
            if (object.id != null)
                message.id = object.id | 0;
            return message;
        };

        /**
         * Creates a plain object from a Person message. Also converts values to other types if specified.
         * @function toObject
         * @memberof addressbook.Person
         * @static
         * @param {addressbook.Person} message Person
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Person.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.name = "";
                object.id = 0;
            }
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            return object;
        };

        /**
         * Converts this Person to JSON.
         * @function toJSON
         * @memberof addressbook.Person
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Person.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Person;
    })();

    addressbook.AddressBook = (function() {

        /**
         * Properties of an AddressBook.
         * @memberof addressbook
         * @interface IAddressBook
         * @property {Array.<addressbook.IPerson>|null} [personInfo] AddressBook personInfo
         */

        /**
         * Constructs a new AddressBook.
         * @memberof addressbook
         * @classdesc Represents an AddressBook.
         * @implements IAddressBook
         * @constructor
         * @param {addressbook.IAddressBook=} [properties] Properties to set
         */
        function AddressBook(properties) {
            this.personInfo = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AddressBook personInfo.
         * @member {Array.<addressbook.IPerson>} personInfo
         * @memberof addressbook.AddressBook
         * @instance
         */
        AddressBook.prototype.personInfo = $util.emptyArray;

        /**
         * Creates a new AddressBook instance using the specified properties.
         * @function create
         * @memberof addressbook.AddressBook
         * @static
         * @param {addressbook.IAddressBook=} [properties] Properties to set
         * @returns {addressbook.AddressBook} AddressBook instance
         */
        AddressBook.create = function create(properties) {
            return new AddressBook(properties);
        };

        /**
         * Encodes the specified AddressBook message. Does not implicitly {@link addressbook.AddressBook.verify|verify} messages.
         * @function encode
         * @memberof addressbook.AddressBook
         * @static
         * @param {addressbook.IAddressBook} message AddressBook message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AddressBook.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.personInfo != null && message.personInfo.length)
                for (var i = 0; i < message.personInfo.length; ++i)
                    $root.addressbook.Person.encode(message.personInfo[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified AddressBook message, length delimited. Does not implicitly {@link addressbook.AddressBook.verify|verify} messages.
         * @function encodeDelimited
         * @memberof addressbook.AddressBook
         * @static
         * @param {addressbook.IAddressBook} message AddressBook message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AddressBook.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AddressBook message from the specified reader or buffer.
         * @function decode
         * @memberof addressbook.AddressBook
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {addressbook.AddressBook} AddressBook
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AddressBook.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.addressbook.AddressBook();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.personInfo && message.personInfo.length))
                        message.personInfo = [];
                    message.personInfo.push($root.addressbook.Person.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AddressBook message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof addressbook.AddressBook
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {addressbook.AddressBook} AddressBook
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AddressBook.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AddressBook message.
         * @function verify
         * @memberof addressbook.AddressBook
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AddressBook.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.personInfo != null && message.hasOwnProperty("personInfo")) {
                if (!Array.isArray(message.personInfo))
                    return "personInfo: array expected";
                for (var i = 0; i < message.personInfo.length; ++i) {
                    var error = $root.addressbook.Person.verify(message.personInfo[i]);
                    if (error)
                        return "personInfo." + error;
                }
            }
            return null;
        };

        /**
         * Creates an AddressBook message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof addressbook.AddressBook
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {addressbook.AddressBook} AddressBook
         */
        AddressBook.fromObject = function fromObject(object) {
            if (object instanceof $root.addressbook.AddressBook)
                return object;
            var message = new $root.addressbook.AddressBook();
            if (object.personInfo) {
                if (!Array.isArray(object.personInfo))
                    throw TypeError(".addressbook.AddressBook.personInfo: array expected");
                message.personInfo = [];
                for (var i = 0; i < object.personInfo.length; ++i) {
                    if (typeof object.personInfo[i] !== "object")
                        throw TypeError(".addressbook.AddressBook.personInfo: object expected");
                    message.personInfo[i] = $root.addressbook.Person.fromObject(object.personInfo[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an AddressBook message. Also converts values to other types if specified.
         * @function toObject
         * @memberof addressbook.AddressBook
         * @static
         * @param {addressbook.AddressBook} message AddressBook
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AddressBook.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.personInfo = [];
            if (message.personInfo && message.personInfo.length) {
                object.personInfo = [];
                for (var j = 0; j < message.personInfo.length; ++j)
                    object.personInfo[j] = $root.addressbook.Person.toObject(message.personInfo[j], options);
            }
            return object;
        };

        /**
         * Converts this AddressBook to JSON.
         * @function toJSON
         * @memberof addressbook.AddressBook
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AddressBook.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AddressBook;
    })();

    return addressbook;
})();

module.exports = $root;
