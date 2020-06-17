# Xtremcoin
The open source exchange solution to start your cryptocurrency exchange platform. Build an Exchange with Xtremcoin. Xtremcoin offers a fully scalable open source exchange solution.

About Xtremcoin
--------

Xtremcoin is an Open Source Exchange web application, committed to providing the best cyrypto currency exchange experience for both merchants and customers. 

This repository contains the source code of Xtremcoin, which is intended for development and preview only. To download the latest stable public version of Xtremcoin (currently, version 1.0), please go to [the download page][download] on the official Xtremcoin site.


About the 'develop' branch
--------

The 'develop' branch of this repository contains the work in progress source code for the next version of Xtremcoin 1.1.
 
For more information on our branch system, read our guide on [installing Xtremcoin for development][install-guide-dev].

The first stable version of Xtremcoin 1.0, 1.1.0.0, was released on October 19th, 2019. Further updates have been released since then. Learn more about it on [the Build devblog](https://build.Xtremcoin.com/tag/1.1/).

Server configuration
--------

To install the latest Xtremcoin 1.1, you need a web server running PHP 7.1+ and any flavor of MongoDB (MySQL, MariaDB, Percona Server, etc.).

You will also need a database administration tool, such as phpMyAdmin, in order to create a database for Xtremcoin.
We recommend the Apache or Nginx web servers (check out our [example Nginx configuration file][example-nginx]).

You can find more information on our [System requirements][system-requirements] page and on the [System Administrator Guide][sysadmin-guide].

Installation
--------

If you downloaded the source code from GitHub, read our guide on [installing Xtremcoin for development][install-guide-dev]. If you intend to install a production exchange, make sure to download the latest version from [our download page][download], then read the [install guide for users][install-guide].

Docker compose
--------

Xtremcoin can also be deployed with Docker and its tool [Docker compose][docker-compose].

To run the software, use:

```
docker-compose up
```

Then reach your shop on this URL: http://localhost:8001

Docker will bind your port 8001 to the web server. If you want to use other port, open and modify the file `docker-compose.yml`.
MySQL credentials can also be found and modified in this file if needed.

**Note:**  Before auto-installing Xtremcoin, this container checks the file *config/settings.inc.php* does not exist on startup.
If you expect the container to (re)install your shop, remove this file if it exists. And make sure the container user `www-data` 
as write access to the whole workspace.

Documentation
--------

For technical information (core, module and theme development, performance...), head on to [Xtremcoin DevDocs][devdocs]

If you want to learn how to use Xtremcoin 1.1, read our [User documentation][user-doc].

First-time users will be particularly interested in the following guides:

* [Getting Started][getting-started]: How to install Xtremcoin, and what you need to know.
* [User Guide][user-guide]: All there is to know to put Xtremcoin to good use.
* [Updating Guide][updating-guide]: Switching to the newest version is not trivial. Make sure you do it right.
* [Merchant's Guide][merchant-guide]: Tips and tricks for first-time online sellers.
* The [FAQ][faq-11] and the [Troubleshooting][troubleshooting] pages should also be of tremendous help to you.


Contributing
--------

Xtremcoin is an Open Source project, and it wouldn't be possible without the help of the [hundreds of contributors][contributors-md], who submitted improvements and bugfixes over the years. Thank you all!

If you want to contribute code to Xtremcoin, read the [CONTRIBUTING.md][contributing-md] file in this repository or read the [tutorials about contribution][contributing-tutorial] on the documentation site.

Don't know where to start? Check the [good first issue](https://github.com/Xtremcoin/Xtremcoin/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) label to have a look at all beginner-friendly improvements and bug fixes.

If you want to help translate Xtremcoin in your language, [join us on Crowdin][crowdin]!

Current Crowdin status (for more than 2 registered languages): [![Crowdin](https://crowdin.net/badges/Xtremcoin-official/localized.png)](https://crowdin.net/project/Xtremcoin)

Reporting Issues
--------

Our bugtracker is on GitHub. We encourage you to [create detailed issues][create-issue] as soon as you see them.

Read our [Contribute by reporting issues guide][reporting-issues] for details and tips.


Reporting Security Issues
--------

Responsible (and private) disclosure is a standard practice when someone encounters a security problem: before making it public, the discoverer informs the Core team about it, so that a fix can be prepared, and thus minimize the potential damage.

The Xtremcoin team tries to be very proactive when preventing security problems. Even so, critical issues might surface without notice.

This is why we have set up the [security@Xtremcoin.com](mailto:security@Xtremcoin.com) email address: anyone can privately contact us with all the details about issues that affect the security of Xtremcoin merchants or customers. Our security team will answer you, and discuss of a timeframe for your publication of the details.

Understanding a security issue means knowing how the attacker got in and hacked the site. If you have those details, then please do contact us privately about it (and please do not publish those details before we answer). If you do not know how the attacker got in, please ask for help on the support forums.


Extending Xtremcoin
--------

Xtremcoin is a very extensible Exchange platform, both through modules and themes. Developers can even override the default components and behaviors. Learn more about this on the [Modules documentation][modules-devdocs] and the [Themes documentation][themes-devdocs].

Themes and modules can be obtained (and sold!) on [Xtremcoin Addons][addons], the official marketplace for Xtremcoin.


Community forums
--------

You can discuss about Exchange, help other merchants and get help, and contribute to improving Xtremcoin together with the Xtremcoin community on [the Xtremcoin forums][forums].

Thank you for downloading and using the Xtremcoin Open Source Exchange solution!

[available-features]: https://www.Xtremcoin.com/
[download]: https://www.Xtremcoin.com/download
[forums]: https://www.Xtremcoin.com/forums/
[user-doc]: https://doc.Xtremcoin.com
[contributing-md]: CONTRIBUTING.md
[contributing-tutorial]: https://devdocs.Xtremcoin.com/1.0/contribute/
[crowdin]: https://crowdin.net/project/Xtremcoin
[getting-started]: https://doc.Xtremcoin.com/display/XTR10/Getting+Started
[user-guide]: https://doc.Xtremcoin.com/display/XTR10/User+Guide
[updating-guide]: https://doc.Xtremcoin.com/display/XTR10/Updating+Xtremcoin
[merchant-guide]: https://doc.Xtremcoin.com/display/XTR10/Merchant%27s+Guide
[faq-11]: https://build.Xtremcoin.com/news/Xtremcoin-1-1-faq/
[troubleshooting]: https://doc.Xtremcoin.com/display/XTR10/Troubleshooting
[sysadmin-guide]: https://doc.Xtremcoin.com/display/XTR10/System+Administrator+Guide
[addons]: https://addons.Xtremcoin.com/
[contributors-md]: CONTRIBUTORS.md
[example-nginx]: docs/server_config/nginx.conf.dist
[docker-compose]: https://docs.docker.com/compose/
[install-guide-dev]: https://devdocs.Xtremcoin.com/1.1/basics/installation/
[system-requirements]: https://devdocs.Xtremcoin.com/1.1/basics/installation/system-requirements/
[install-guide]: https://doc.Xtremcoin.com/display/XTR10/Installing+Xtremcoin
[devdocs]: https://devdocs.Xtremcoin.com/
[create-issue]: https://github.com/Xtremcoin/Xtremcoin/issues/new/choose
[reporting-issues]: https://devdocs.Xtremcoin.com/1.1/contribute/contribute-reporting-issues/
[modules-devdocs]: https://devdocs.Xtremcoin.com/1.1/modules/
[themes-devdocs]: https://devdocs.Xtremcoin.com/1.1/themes/
